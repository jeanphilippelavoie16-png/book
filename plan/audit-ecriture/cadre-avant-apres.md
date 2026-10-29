# Le cadre, avant et après (28 octobre 2026)

Ce fichier suit chaque case et chaque ligne de l'ancien cadre (`git show 7bc9e9f6:.claude/cadre-agents.md`) jusqu'à sa
place dans le nouveau. JP a répondu « ok pour tout » aux onze questions du rapport, et trois de ses décisions changent
le cadre (`plan/decisions-jp.md`, « Les bases de l'écriture, après l'audit »). La décision 1 met les auditeurs dans la
chaîne du texte, la décision 2 fait entrer une correction de JP à une seule place, et la décision 3 fait donner le cadre
en morceaux. Rien ne s'imprime ici.

## Ce qui change

Le nouveau cadre a une en-tête pour l'orchestrateur, puis huit sections aux noms fixes : « Pour tout agent », « Le
rédacteur », « Le vérificateur technique », « Les auditeurs », « L'éditeur », « Le correcteur », « Le metteur en pages »
et « Les planches et les images ». Chaque agent reçoit « Pour tout agent » et la section de son rôle. Le lecteur naïf
(A2) ne reçoit rien du cadre.

Chaque section de rôle a sa liste de contrôle, de sept à neuf cases, parce qu'au-delà de cinq à neuf éléments une
liste dépasse la mémoire de travail (Gawande, cité dans `regles/R3-architecture.md`, section 4). Une règle d'écriture
y est citée par son numéro (« skill `ecriture`, P5 ») au lieu d'être recopiée (décision 2). Les parties des planches et
du montage gardent tout leur contenu technique et les mots de JP, rangées sous leur rôle, et leur liste de contrôle
vient à la fin de la section.

| Mesure (`tempo.py`) | Avant | Après |
| --- | --- | --- |
| Mots du fichier | 5 816 | 6 068 |
| Mots qu'un rédacteur reçoit | 5 816 | 1 030 (« Pour tout agent » et « Le rédacteur ») |
| Mots qu'un éditeur reçoit | 5 816 | 810 |
| Mots par phrase | 62,2 | 27,1 |
| Phrases avec deux-points | 78,6 % | 2,4 % |
| Phrases « fait : conséquence » | 70,2 % | 1,4 % |
| Mots de liaison pour 1000 mots | 3,6 | 7,5 |

Le fichier entier grossit un peu, parce que les phrases disent leur lien et que les mots de JP restent avec leur date.
Mais personne ne le reçoit au complet, et la case la plus longue, celle des notes « En plus » (523 mots), est devenue
une case de la liste du metteur en pages, avec son contenu rangé dans la sous-section « Les notes « En plus » ».

## Chaque ligne de l'ancien cadre

Les numéros de ligne sont ceux de l'ancien fichier. « Copie de » veut dire que la règle vit déjà ailleurs, à la place
nommée, et que le nouveau cadre la cite ou la laisse là. « Morte parce que » veut dire que la ligne ne vaut plus.

### L'en-tête et « Pour tout agent »

| L. | La case ou la ligne | Où elle va |
| --- | --- | --- |
| 1 | Le titre | Le même titre |
| 3-4 | Les mots de JP du 16 octobre (« ça sert à rien de faire ça si on refait toujours les mêmes erreurs ») | En-tête, deuxième paragraphe, mot pour mot |
| 4-5 | « Ce fichier est collé au complet dans le brief de chaque agent » | Morte parce que la décision 3 fait donner le cadre en morceaux ; la nouvelle règle ouvre l'en-tête |
| 5-6 | L'agent rend la liste de contrôle de sa partie, cochée ligne par ligne | « Pour tout agent », dernière ligne |
| 6-7 | L'orchestrateur ne montre rien à JP sans avoir repassé la liste sur les pages montées | « Le metteur en pages », case 9 |
| 9-10 | « Toute correction de JP entre le jour même dans le skill concerné et dans la liste de ce fichier » | Morte parce que la décision 2 la remplace (une seule place, le jour même) ; la nouvelle règle est dans l'en-tête et dans `CLAUDE.md`, « Les agents et la chaîne » |
| 10-11 | Une correction qui vit seulement dans `suivi/plan-de-match.md` sera refaite | En-tête, troisième paragraphe |
| 15 | `CLAUDE.md` est déjà chargé, il prime, on ne le relit pas | « Pour tout agent », première ligne |
| 16 | Lire au complet le skill de sa partie, avec ses tableaux | Chaque section de rôle nomme ce que l'agent lit au complet ; les auditeurs ne lisent pas le skill au complet (bases, section 7.1) |
| 17-19 | Les points de la « PAUSE du 15 octobre » qui touchent sa tâche | « Pour tout agent » |
| 20-21 | La règle 1, et « la source sert à vérifier un fait, jamais à copier une forme » | « Pour tout agent », avec le renvoi à P10, qui porte aussi cette phrase |
| 22 | Ne rien commiter | « Pour tout agent », avec les fichiers qu'on a le droit de toucher |
| 23 | Rapport court, en français, liste cochée | « Pour tout agent » |
| 25-26 | « Économiser les jetons », avec les mots de JP du 20 octobre | « Pour tout agent », mot pour mot |
| 26-27 | « au 19 octobre, un agent relisait en moyenne 265 000 jetons par appel, et les agents faisaient plus de 80 % des jetons » | Morte parce que c'est la mesure datée qui justifiait la règle ; la règle, sa raison (chaque appel relit tout le contexte) et les mots de JP restent |
| 29-31 | Un agent par sujet ; les petites corrections d'un fichier ensemble ; deux sujets sans fichier commun, deux agents | En-tête, troisième paragraphe (c'est le travail de l'orchestrateur) |
| 32-33 | Lire seulement ce que la tâche touche, grep puis plages | « Pour tout agent » |
| 34-35 | Une image seulement pour la juger, une planche contact | « Pour tout agent » |
| 36 | Couper les sorties de commande | « Pour tout agent » |
| 37 | Le rapport dit ce qui a changé, sans recopier | « Pour tout agent » |

### « Le texte » (skill `ecriture`)

| L. | La case ou la ligne | Où elle va |
| --- | --- | --- |
| 42-48 | Sept sections, plus de « Comment ça marche », plus de section Danger, le pictogramme dans l'étape avec ce qui est propre au chapitre | Copie du gabarit (en-tête, section 4) et de `CLAUDE.md` (« Le gabarit ») ; « Le rédacteur », case 1, les cite |
| 46-47 | « `ours` et `orignal` sont deux pictogrammes distincts » | « Le rédacteur », case 1 (cette décision de JP du 18 octobre vit seulement dans le cadre et dans `suivi/plan-de-match.md`) |
| 48 | Les renvois « section N » suivent la numérotation du chapitre | « Le rédacteur », case 1 |
| 49-50 | Rien sous le titre que la ligne de lieu | Copie du gabarit (« Avant la section 1, la ligne de lieu ») |
| 51 | Section 2, seulement quand l'utiliser | Copie du gabarit, section 2, avec les mots de JP |
| 52 | Le chapitre couvre l'année, ce qui change la nuit est marqué | « Le rédacteur », case 2 (`plan/decisions-jp.md` dit que cette règle vit dans le cadre) |
| 55-56 | La série orange joue la scène réelle, rien de préparé, ce qui sauve d'abord | Copie de `CLAUDE.md` (« Les premières minutes, en orange ») ; « Le rédacteur », case 3, la cite et garde « jouer la scène » |
| 56 | Chaque consigne de sécurité confrontée aux autres dangers du scénario | « Le rédacteur », case 3 ; « Le vérificateur technique », case 4, pour la source qui dit lequel gagne |
| 57 | La pastille dit le temps qu'on a, et ce temps est sourcé | Copie de `CLAUDE.md` (« Les premières minutes ») pour la pastille, et de la règle 1 (« Pour tout agent ») pour la source |
| 58-60 | Le logigramme court, l'orange détaillé où tout est, plus de « … : le détail », rien de l'orange redit ailleurs | Copie de `CLAUDE.md` (« Les premières minutes, en orange ») |
| 61-63 | La page de droite d'un logigramme en double page (« mal centré ») et ses mesures | « Le metteur en pages », « Le logigramme en double page », et case 2 |
| 64-71 | Les notes « En plus », ce qu'elles portent : 30 à 80 mots, trois sortes, jamais de planche ni de dessin, rien que le chapitre dit déjà | Copie du gabarit (« En plus »), avec les mots de JP (« fais un mixte… », « moins de texte », « je veux pas de planche dans les affaires vertes ») |
| 71-80 | La feuille vert pâle droite, l'ombre, une par page, dispersées, jamais au travers du texte, le trou, le bas de la dernière page | « Le metteur en pages », « Les notes « En plus » », et case 3 |
| 80-83 | Le « i » blanc dans la bulle verte (`XICO`, `.extra .xico`), expliqué sur « Comment le livre fonctionne » | « Le metteur en pages », « Les notes « En plus » » |
| 83 | La note dit son étape entre parenthèses ; une réserve de 4 à 8 par chapitre | Copie du gabarit (« En plus ») |
| 83-86 | Une note sans page ne s'imprime pas, jamais une page de notes seules, jamais sur le pied de page | « Le metteur en pages », « Les notes « En plus » », et case 3 |
| 87-88 | L'ordre du début du tome | « Le metteur en pages », « L'ordre des pages » |
| 89-90 | Le logigramme après le Matériel, sans avertissement redit, en phrases complètes | « Le rédacteur », case 4, pour le texte ; « Le metteur en pages », « L'ordre des pages », pour la place |
| 93-94 | Règle 0, la phrase lue à voix haute | Copie de P1 (et de P8 pour le verbe et le sujet) ; « Le rédacteur », case 6, la cite |
| 95-97 | Pas de loi en formule ni de paraboles, jamais « d'où » | Copie de P12 et de P3 ; les mots de JP sont dans `plan/decisions-jp.md`, lignes du 16 octobre |
| 98 | Pas de « X passe là où Y ne passe pas » | Copie de P12 et de P3 (`plan/decisions-jp.md`, ligne du 16 octobre) |
| 99 | Pas de maxime, de chute, d'opposition fabriquée, d'image | Copie de P12, qui remet la condition de JP (l'opposition sort quand elle n'ajoute pas un fait) |
| 100-102 | Pas de chose qui pense ; le script les repère | Copie de P12 ; le script est A0 (« Le rédacteur », case 9) |
| 103-104 | La consigne jamais au pronominal | Copie de P8 et de `CLAUDE.md` (« Les règles fermes de JP ») |
| 105-106 | La consigne comme une consigne, le sujet nommé, l'ordre naturel | Copie de P8 |
| 107-109 | Points de contrôle et signes d'échec, 5 à 8 lignes | Copie du gabarit, sections 5 et 6, avec les mots de JP |
| 110-112 | Pages des dangers, deux par page, 150 à 230 mots, plus de « Où il revient » | Copie de `plan/dangers-inventaire.md`, section 2 ; « Le rédacteur », case 6, la cite avec la décision 5 |
| 113-115 | Un passage signalé se juge d'abord, doit-il exister ? | « L'éditeur », deuxième paragraphe et case 2, avec les mots de JP (copie de P2) |
| 116-117 | La passe d'éditeur suit le skill `editeur`, /diagnostiquer puis /polir, la liste des coupes | « L'éditeur », avec le changement de la décision 1 (les rapports des auditeurs, une seule réécriture au lieu de « /polir ensuite ») |
| 118-120 | Le chapitre parle de son sujet | Copie de `CLAUDE.md` (« Le gabarit ») et de P2 ; « Le rédacteur », case 7, les cite |
| 121-123 | Une notion s'explique à sa première apparition (« règle 14 ») | Copie de P14 ; « Le rédacteur », case 7 |
| 124-127 | « Quand l'utiliser » en titres de situation (« règle 13 ») | Copie du gabarit, section 2, et de P10 |
| 128-131 | Qui fait quoi, sans « on est tenté de », une liste qui ne mélange pas deux sortes (« règle 12 ») | Copie de P2, P4 et P12 (`plan/decisions-jp.md`, « Les anciennes règles », règle 12) |
| 132-136 | Le mot qu'on dit (« règle 15 »), la section « Mots de livre » de `controle.py` | Copie de P10 ; le script est A0 (« Le rédacteur », case 9) |
| 137 | Nommer la chose au lieu du possessif | Copie de P4 (on reprend le nom plutôt qu'un pronom qui peut désigner deux choses) ; les mots de JP (« son robinet ») sont dans `plan/decisions-jp.md`, ligne du 16 octobre |
| 138-139 | Les mots de tous les jours : « carter », « seuil », « un change », le nom latin, « 84 mois (7 ans) » | Copie de P10 (`plan/decisions-jp.md`, lignes du 15 et du 16 octobre) et de `CLAUDE.md` (« Ce qui ne s'imprime pas », aucun nom latin, décision 11) ; l'exemple « 84 mois » est corrigé au ch. 1 (`suivi/01-redaction.md`) |
| 140 | Aucun tiret, « section N » et jamais « § » | Copie de P6 et de `CLAUDE.md` (« Les règles fermes de JP ») ; « § » est bloqué par `controle.py` (« Le rédacteur », case 9) |
| 141 | Les titres de sous-sections nomment des gestes ou des choses | « Le rédacteur », case 7 (la règle vivait seulement ici) |
| 142-146 | Les tournures du 18 octobre dans les pages des dangers | Copie de P12 ; les mots de JP sont dans `plan/decisions-jp.md`, ligne du 18 octobre. La relecture phrase par phrase par quelqu'un qui n'a pas écrit la page est le travail de A1 (« Les auditeurs ») |
| 149-151 | Une étape à plusieurs gestes en sous-étapes, chacune avec son repère de planche | Copie de P9 pour les sous-étapes ; « Le rédacteur », case 5, garde le renvoi au repère dans l'ordre des repères |
| 152 | Une autre façon se dit comme une autre façon | « Le rédacteur », case 5 (la règle vivait seulement ici pour le texte ; pour la planche, c'est la règle 10 de `images/recommandations-planches.md`) |
| 153-154 | L'urgence ne s'appuie pas sur une préparation ; un objet préparé s'explique | Copie de P14 et de `CLAUDE.md` (« Les premières minutes » : la personne qui lit n'a rien préparé) |
| 157-158 | Un fait à une seule place, les rappels dans leur étape, la variante qui n'apprend que du neuf | Copie de P2 ; les rappels sont dans « Pour tout agent » |
| 159-162 | Un nom ne revient pas à chaque phrase (« 4 fois Claude ») ; un texte qui présente quelqu'un commence par ce qui le rend vivant (« c'est dull ») | Copie de P11, avec sa condition (un texte qui présente quelqu'un) ; les mots de JP et la version qu'il a prise sont dans `plan/decisions-jp.md`, ligne du 19 octobre. Étendue à tout le livre, la règle est morte parce qu'elle contredisait « le même mot pour la même chose » |
| 165-166 | Chaque planche appelée « (planche NN-NN) », une fois par phrase, deux pleines pages pas sur la même page, `apres` unique | « Le rédacteur », case 8 |
| 169-170 | `controle.py` avant de rendre, 0 tiret, 0 « § », 0 mot banni, les avis jugés | « Le rédacteur », case 9 (A0). La catégorie « pronominal » n'existe pas dans le script ; la case dit seulement de juger chaque avis |

### « La langue » (skill `langue`)

| L. | La case ou la ligne | Où elle va |
| --- | --- | --- |
| 174-175 | La dédicace de l'épreuve du tome 1 et les mots de JP du 27 octobre | « Le correcteur », paragraphe d'ouverture (copie aussi dans `CLAUDE.md` et dans le skill `langue`) |
| 177-179 | Tout texte qui s'imprime passe par le correcteur | « Le correcteur », case 1, et case 6 pour les textes fixes |
| 180-182 | `langue.py` avec LanguageTool, 0 avis, `faux-positifs.txt` | « Le correcteur », case 2 |
| 183-185 | Le texte lu au complet, chaque « que », participe, homophone, pronom | « Le correcteur », case 3, qui renvoie au skill `langue` (« La méthode du correcteur », point 2), où vit la liste |
| 186-187 | Le français correct, ni joual ni anglicisme | « Le correcteur », case 4, avec la décision 7 (`CLAUDE.md`, règle 6) |
| 188-190 | Pas deux « ou » l'un dans l'autre | Copie du skill `langue`, section 10, avec les mots de JP ; « Le correcteur », case 3, la cite |
| 191 | Le correcteur ne touche que la langue et note ses corrections | « Le correcteur », case 5 |
| 192-193 | Après le montage, la section « Langue » à 0 avis | « Le metteur en pages », case 8 (fusionnée avec la ligne 324, qui disait la même chose) |
| 194 | Une question de JP sur une faute, jamais de mémoire | « Le correcteur », case 7 |

### « Les planches » (skill `planches`)

| L. | La case ou la ligne | Où elle va |
| --- | --- | --- |
| 198 | Le cadre complet est `brief-agent.md` | « Les planches et les images », ouverture |
| 199-202 | Les mains par `mainStock`, les corps, les têtes, jamais à la main, la prise laide | « Les mains, les corps et les têtes », et case 1 |
| 203-205 | La paume vers la surface (planche 04-41) | « Les mains, les corps et les têtes », et case 2 ; la phrase « une main qui se lit paume en l'air ne frotte rien », signalée comme maxime par `controle.py`, dit maintenant le fait en clair |
| 206-209 | Une main de la bibliothèque ne se déforme jamais (« laid en tabarnak ») | « Les mains, les corps et les têtes », et case 1 |
| 210-214 | Ce que le personnage porte suit sa taille (planche 04-40) | « Les mains, les corps et les têtes », et case 3 |
| 215-216 | La règle 1 vise les chiffres (le travois du ch. 16) | « Pour tout agent », parce qu'elle vaut pour tous les rôles |
| 217-219 | Un livre ouvert, « pour une famille de quatre » | « Pour tout agent » pour la famille de quatre ; l'âge des enfants est une copie de `CLAUDE.md` (« Un livre ouvert ») |
| 220-223 | La matière à sa vraie fibre (planche 13-10) | « Les matières et les objets », et case 4 |
| 224-226 | Le bois comme du bois (13-40) | « Les matières et les objets », et case 4 |
| 227-228 | La coupe suit le contour (13-09) | « Les matières et les objets », et case 4 |
| 229-230 | L'objet qui revient reprend le dessin réussi (13-10) | « Les matières et les objets », et case 4 |
| 231-233 | Quand la tête n'apprend rien, cadrer sur les mains | « Les mains, les corps et les têtes » |
| 234-237 | Les bras jusqu'aux mains (26-09a) | « Les mains, les corps et les têtes », et case 2 |
| 238 | Une planche signalée se refait au complet | « La planche et son texte » |
| 239 | Jamais de cheveux, le visage seulement quand il sert | « Les mains, les corps et les têtes », et case 3 |
| 240 | L'eau par `h.a.hachure('eau')` | « Les matières et les objets », et case 4 |
| 241 | Chaque rouge a son repère (règle 11) | « La planche et son texte », et case 5 |
| 242 | Une autre façon est marquée (règle 10) | « La planche et son texte », et case 5 |
| 243 | L'ordre des repères suit l'ordre des gestes | « La planche et son texte », et case 5 |
| 244 | Les légendes en mots de tous les jours | « La planche et son texte », et case 5 |
| 245 | La taille selon le besoin | « La planche et son texte », et case 6 |
| 246 | Pas de ligne « Planche NN. Titre. » | « La planche et son texte », et case 6 |
| 247-248 | Le regard qualité, c'est JP | « Le regard » |
| 249-251 | Un seul second regard, cinq points au plus, PNG dans `images/a-valider/` | « Le regard », et case 8 |
| 252-261 | Les images d'ambiance et les linogravures des pages de titre et des couvertures | « Les images d'ambiance et les couvertures », et case 9 |
| 262-267 | Les couvertures aux mesures Lulu Case Wrap, la zone sûre, `couverture.py` | « Les images d'ambiance et les couvertures », et case 9 |

### « Le montage et la vérification » (orchestrateur)

| L. | La case ou la ligne | Où elle va |
| --- | --- | --- |
| 271 | Aucun vérificateur sécurité | « Les auditeurs », dans la limite de A3 (copie de `CLAUDE.md`, « Les agents et la chaîne ») |
| 272-273 | Pas de workflow pour une tâche qui tient dans la conversation, le coût donné à JP | Copie de `CLAUDE.md` (« Économiser les jetons ») |
| 273 | Pas de tour de relecture par agents, le regard qualité c'est JP | Morte pour le texte parce que la décision 1 y met les auditeurs ; elle reste pour les planches et les images (« Le regard ») |
| 274-278 | À une refonte, le vérificateur technique ne revérifie pas ce qui l'a été | « Le vérificateur technique », case 2, avec les mots de JP |
| 278 | L'éditeur prend trois chapitres à la fois | « L'éditeur », paragraphe d'ouverture |
| 279-283 | Les photos seulement sur les pages blanches, la page de quelques lignes résorbée | « Le metteur en pages », « Les pages pleines et les pages vides », et case 4 |
| 283-285 | Une note verte au plus par page, jamais sous un titre resté seul | « Le metteur en pages », « Les notes « En plus » » |
| 285-286 | Pas de pastilles tirées de l'image du tome ; JP aime les notes avec des photos pour reconnaître | « Le metteur en pages » (« Les pages pleines et les pages vides », « Les notes « En plus » ») |
| 287-289 | Le courriel de JP, permis pour Wikimedia seulement | « Les planches et les images », « Le courriel de JP » |
| 290-292 | Rien par-dessus le texte, `chevauchements.py`, le tableau de cinq colonnes | « Le metteur en pages », « Le texte et les tableaux », et case 5 |
| 293-295 | Le logigramme juste après le Matériel, la procédure toujours après lui | « Le metteur en pages », « L'ordre des pages », et case 1 |
| 296-297 | Pas de vide inutile, le chapitre peut ouvrir à gauche | « Le metteur en pages », « L'ordre des pages » |
| 298-301 | Le pictogramme, le fond rose, le filet, le nom et la page en rouge ; deux dangers par page, 8 pt | « Le metteur en pages », « Les dangers », et case 7 |
| 302-305 | La série orange tout de suite après le logigramme, en tête de la section 4 | « Le metteur en pages », « L'ordre des pages », et case 1 |
| 306-309 | Un sujet par série orange (ch. 15) | « Le rédacteur », case 3, pour l'intertitre, la pastille et les numéros ; « Le metteur en pages », « L'ordre des pages », pour les planches posées après chaque série |
| 310-315 | La série orange d'un trait, ses planches en face | « Le metteur en pages », « L'ordre des pages », et case 1 |
| 316-317 | Le renvoi `{>id}` dans les pages des dangers | Copie de `plan/dangers-inventaire.md`, section 6, point 6, avec les mots de JP du 27 octobre |
| 318-320 | Le texte justifié, la césure fr-CA | « Le metteur en pages », « Le texte et les tableaux » |
| 321-322 | Aucune liste qui déborde d'une ou deux lignes | « Le metteur en pages », « Les pages pleines et les pages vides », et case 4 |
| 324 | La section « Langue » et `langue.py --assembleur` à 0 avis | « Le metteur en pages », case 8 |
| 325 | Chaque planche sur la page de son appel ou la suivante | « Le metteur en pages », case 6 (`plan/decisions-jp.md` dit que le cadre garde cette vérification) |
| 326 | Aucun début de section coupé, aucune colonne à un quart de vide | « Le metteur en pages », « Les pages pleines et les pages vides », et case 4 |
| 327 | Le bandeau rouge, la flèche rouge | « Le metteur en pages », case 6 |
| 328-329 | L'orchestrateur relit chaque page à l'image avant d'envoyer | « Le metteur en pages », case 9 |

## Ce qui entre et qui n'était pas dans l'ancien cadre

- L'en-tête dit comment donner le cadre, et que A2 ne reçoit rien (décision 3).
- « Pour tout agent » dit qu'on modifie seulement les fichiers que son brief nomme.
- « Les auditeurs » est neuf. Il suit les bases (section 7), renvoie aux fiches de
  `.claude/skills/ecriture/references/auditeurs.md` (« Ce qui vaut pour tous », « Son rapport ») au lieu de les
  recopier, et nomme le workflow `.claude/auditer-chapitre.workflow.js`.
- « L'éditeur » reçoit les trois rapports, répond à chaque cas et réécrit une seule fois, et il pose les trois questions
  de l'intention de JP (bases, section 7.6).
- « Le vérificateur technique » repasse après l'éditeur sur ce qui a changé de sens, et il reçoit les doutes de fond
  de A3 (bases, section 7.7).
- « Le rédacteur » cite les décisions 5, 6 et 9, et « Le correcteur » la décision 7.
