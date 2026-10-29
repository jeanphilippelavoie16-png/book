# R3 : l'architecture de nos règles d'écriture (28 octobre 2026)

Mandat : juger où vit chaque règle d'écriture, combien de fois elle est redite, ce qu'un agent peut vraiment appliquer,
ce qui est un principe et ce qui est une liste d'exemples, ce qui se vérifie par script et ce qui demande une oreille ;
puis proposer une structure pour « repartir sur des bonnes bases », avec des auditeurs placés dans la chaîne.

Aucun fichier du livre ni des règles n'est touché. Les contradictions entre les règles sont dans R1
(`plan/audit-ecriture/regles/R1-contradictions.md`, avec la liste des 21 règles mortes, M1 à M21) et la littérature
dans L1 à L5 (`plan/audit-ecriture/litterature/`). Je m'y réfère sans les refaire : ces notes portent sur la forme du
système de règles, pas sur le détail de chaque règle. Les chiffres viennent de comptes faits ce jour sur le dépôt
(`wc -w`, `grep`, `tempo.py`, `controle.py`) ; ce sont des mesures de nos fichiers, ils ne vont pas dans le livre.

---

## 1. Le diagnostic en sept points

1. **Les règles d'écriture vivent dans dix fichiers et quatre scripts, et un rédacteur lit quatre de ces fichiers au
   complet avant d'écrire une ligne.** `CLAUDE.md`, le cadre, le gabarit et le skill `ecriture` font 19 485 mots. L'éditeur en lit à peu près
   autant, plus le chapitre, soit environ 25 000 mots avant de toucher une phrase. Près de la moitié du cadre (2 723 mots
   sur 5 816, les parties planches et montage) ne concerne pas quelqu'un qui écrit.
2. **La même règle existe en quatre à neuf copies, rédigées chaque fois autrement, et on n'enlève jamais l'ancienne.**
   C'est une règle qui le veut : « Toute correction de JP entre le jour même dans le skill concerné et dans ce cadre »
   (`CLAUDE.md` et cadre, l. 9 à 11). Elle a été écrite le 16 octobre pour que les agents cessent de refaire les mêmes
   erreurs, et elle a marché pour ça ; mais chaque correction ajoute deux copies ou plus, et la version périmée reste à
   côté. R1 compte 21 règles mortes et 18 contradictions ; la plupart viennent de là.
3. **Le skill `ecriture` est un journal, pas un manuel.** Sur 8 443 mots, 3 781 (45 %) racontent ce que JP a dit et ce
   qu'on a corrigé (la section « Ce que JP a dit » et le tableau de 26 lignes « Ce que la relecture du 15 octobre change
   à la passe ») ; 37 % des mots du skill sont entre guillemets. Les seize règles de la phrase tiennent dans 1 896
   mots avec leurs exemples, et aucune ne porte sur le paragraphe.
4. **Ce qui se vérifie par script est appliqué ; ce qui demande une oreille ne l'est pas.** Le livre n'a plus un seul
   numéro de norme, un seul 911 ni une seule attribution, et le tome 1 refait n'a que 36 tirets hors tableaux. Par
   contre, 23,7 % des phrases du livre sont en « fait : conséquence » et il y a moins d'un « mais » pour 1000 mots
   (0,6 selon le compte de R1, 0,8 selon celui de L5),
   parce que rien ne mesure les liens et que personne n'a l'oreille du paragraphe comme mission. De plus, tous nos
   scripts cherchent ce qui est en trop (un mot, un tiret, une tournure) ; aucun ne signale ce qui manque.
5. **Les corrections entrent comme des fragments à substituer**, pas comme des principes. Le paragraphe du monoxyde est
   fait de trois lignes de la table « On l'écrit / On le dit » (skill, l. 163 à 165), recopiées telles quelles. Les
   motifs de `controle.py` collent aux mots de l'exemple de JP (« devient flamme | feu | braise », « part à + verbe ») :
   ils attrapent la phrase qu'il a corrigée, pas la suivante.
6. **Personne dans la chaîne n'a le tempo ni l'oreille pour mission.** Le vérificateur fait les faits, le correcteur la
   langue ; l'éditeur hérite de tout le reste, avec un skill (`editeur`) qui perd les conflits et dont la seule règle de
   rythme (« alterne phrases courtes et phrases longues ») ne passe pas dans l'adaptation au livre. « Pas de tour de
   relecture d'agents » (`CLAUDE.md`, cadre) retire le dernier garde-fou ; c'est JP qui fait l'oreille, sur une épreuve
   payée.
7. **Les règles sont écrites dans le style qu'elles combattent, et les agents imitent ce qu'ils lisent le plus.** Le
   cadre a 62 mots par phrase en moyenne et 78,6 % de phrases avec deux-points (R1, point 6). Le pronominal de consigne,
   interdit dans le livre, revient 4,9 fois pour 1000 mots dans `CLAUDE.md` et 4,4 dans le skill (« elle se coupe »,
   « se réécrit », « se juge »), contre 0,2 dans le tome 1 refait (compte par motif, à juger un par un, mais l'écart est
   net).

---

## 2. Où vivent les règles aujourd'hui

| Fichier | Mots | Quand il est lu | Par qui | Ce qu'il porte sur l'écriture |
| --- | --- | --- | --- | --- |
| `CLAUDE.md` | 3 488 | Toujours, à chaque session et dans chaque agent | Tous | « L'écriture » (578 mots), « Le gabarit » (777), « Ce qui ne s'imprime pas » (400), les règles non négociables, les rappels |
| `.claude/cadre-agents.md` | 5 816 | Collé au complet dans chaque brief | Tous | « Le texte » : 39 cases (2 440 mots) ; « La langue » : 8 cases ; plus 25 cases de planches (1 487 mots) et 20 de montage (1 236) |
| Skill `ecriture` | 8 443 | Quand le skill est appelé | Rédacteur, éditeur | 16 règles numérotées, 53 lignes de tableaux, une passe en 8 étapes, 10 cases |
| Skill `editeur` | 1 128 | Quand le skill est appelé | Éditeur | Le texte de JP, un tableau de 9 lignes qui redit le skill `ecriture`, 5 étapes |
| Skill `langue` | 2 396 | Quand le skill est appelé | Correcteur | 10 sections de fautes, la méthode, 6 cases |
| `gabarit-chapitre.md` | 1 738 | Par le rédacteur (`roles.md`) | Rédacteur | La forme du chapitre, encore en « neuf points » (R1, M1 à M6) |
| `roles.md` | 1 015 | Par l'orchestrateur, pour les prompts | Orchestrateur | Six rôles, dont un retiré, avec des consignes périmées (R1, M14 à M18) |
| `plan/decisions-jp.md` | 6 020 | Jamais chargé | Personne d'office | Les mots de JP et l'origine des règles, arrêté au 20 octobre puis complété par endroits |
| `plan/demandes-jp-epreuve-tome-1.md` | 1 296 | À la demande | Orchestrateur | Les 14 correctifs des 27 et 28 octobre |
| `suivi/plan-de-match.md` | 10 662 | « Les points qui touchent sa tâche » (cadre, l. 17) | Tous, en principe | Des décisions de JP pas encore appliquées |
| Scripts | 802 lignes | Lancés à la main | Rédacteur, éditeur, correcteur | `controle.py` (listes de mots codées dans le script), `langue.py` (LanguageTool et nos règles), `tempo.py` (branché nulle part) ; l'assembleur relit la langue et avertit si un danger ne tient pas dans sa demi-page |

**Ce qu'un rôle lit avant de commencer** (sans le chapitre, qui fait environ 6 000 mots en moyenne) : le rédacteur,
19 485 mots ; l'éditeur, 18 875 ; le correcteur, 11 700. Le skill `ecriture` est le plus gros skill du dépôt (le
suivant, `planches`, a 5 702 mots, et il a déjà sorti son détail dans `references/`).

---

## 3. Combien de fois une règle est redite

Une copie, ici, c'est un endroit où la règle est énoncée, pas un simple renvoi. Les comptes viennent de la lecture des
fichiers et d'un `grep` sur la phrase type de chaque règle.

| Règle | Copies | Où | Ce qui diverge d'une copie à l'autre | Contrôle aujourd'hui |
| --- | --- | --- | --- | --- |
| Aucun tiret dans une phrase | 10 places dans 8 fichiers (sans compter les règles des légendes) | `CLAUDE.md`, cadre (2 cases), skill `ecriture` (section et case finale), skill `langue`, gabarit, `roles.md`, `decisions-jp.md`, `controle.py` | La liste de remplacement met la virgule et le deux-points en tête (R1, C3) ; le gabarit qui l'énonce a lui-même des tirets | Script bloquant. Appliqué au tome 1 ; 4 375 tirets restent dans les tomes 2 à 6, qui attendent la grande passe |
| Lu à voix haute, compris du premier coup (règle 0) | 6 | `CLAUDE.md`, cadre, skill (règle 0, « Le test », étape 6 de la passe), `editeur`, `decisions-jp.md`, `demandes-jp` | Toujours testée sur la phrase seule, jamais sur le paragraphe | Oreille ; aucun rôle ne l'a pour mission |
| Informatif, pas de « fils d'la AI » | 5 | `CLAUDE.md` (une seule phrase de onze familles), skill (« Ce qui sort », 20 lignes, et le tableau du 15 octobre), cadre (5 cases), `editeur` (directives anti-IA), `decisions-jp.md` | Quatre listes de mots vides et de tics qui ne sont pas les mêmes : `CLAUDE.md` (« déjà, encore, tout »), le skill (13 mots), `controle.py` (19 mots vides et 18 mots d'IA), `editeur` (« les adverbes en -ment ») ; la condition de JP se perd (R1, point 4) | Script, en signal |
| La consigne n'est jamais au pronominal | 4 | `CLAUDE.md`, cadre, skill (règle 11 et une ligne de tableau), `decisions-jp.md` | Les fichiers de règles l'emploient eux-mêmes ; le gabarit en donne un modèle (« Ne se fabrique pas. ») | **Aucun.** Le cadre (l. 170) demande de juger les avis « pronominal » de `controle.py`, mais le script n'a pas cette catégorie |
| Le sujet se nomme, l'ordre est naturel | 5 | `CLAUDE.md`, cadre, skill (règle 11, deux lignes de tableau), `decisions-jp.md`, `controle.py` | | Script, en signal (« tournure ») |
| « Quand l'utiliser » en titres de situation | 8 places dans 6 fichiers | `CLAUDE.md`, cadre (l. 51 et 124), skill (règle 13 et une ligne du tableau), gabarit, `editeur`, `demandes-jp` | | Oreille ; en partie comptable (une liste « mauvaise procédure ») |
| Points de contrôle et signes d'échec : 5 à 8 lignes | 7 places dans 5 fichiers | `CLAUDE.md`, cadre, gabarit (sections 6 et 7), `editeur` (2 lignes), `demandes-jp` | | **Aucun**, alors qu'un script compte des lignes de tableau sans se tromper |
| Pages des dangers : deux par page, 150 à 230 mots | 6 | `CLAUDE.md`, cadre (« La phrase » et « Le montage »), `editeur`, `demandes-jp`, l'assembleur | « Deux ou trois phrases de mécanisme » n'est que dans `editeur` | L'assembleur avertit si le texte ne tient pas à 8 pt ; personne ne compte les mots |
| Matériel : une ligne, 15 à 20 mots | 4 | `CLAUDE.md`, gabarit, `decisions-jp.md`, `plan-de-match` | Le « format validé » du gabarit a un pronominal et un participe sans sujet (R1, M6) ; on le retrouve tel quel au ch. 101 | Aucun |
| Les notes « En plus » | 4 | `CLAUDE.md`, cadre (une seule case de 523 mots), gabarit, `decisions-jp.md` | `CLAUDE.md` permet « un petit dessin », le cadre l'interdit ; le gabarit les dit « glissée[s] après le paragraphe de l'étape », `CLAUDE.md` « jamais entre deux paragraphes » | Le moteur pour la place ; personne pour les 30 à 80 mots |
| Doit-il exister ? | au moins 5 places dans 4 fichiers | cadre, skill (règle 12), `editeur` (tableau et passe), `demandes-jp` | | Oreille (éditeur) |
| Le chapitre parle de son sujet | 5 | `CLAUDE.md`, cadre, `editeur`, `decisions-jp.md`, `demandes-jp` | | Oreille (éditeur) |
| Le mot qu'on dit | 6 | cadre, skill (règle 15 et sa table de 16 lignes), `editeur`, `decisions-jp.md`, `demandes-jp`, `controle.py` (43 motifs) | Deux listes différentes, la table du skill et les motifs du script ; la frontière avec le joual se dit autrement dans le skill `langue` (R1, C11) | Script en signal, et oreille |
| Une notion s'explique à sa première apparition | 4 | cadre, skill (règle 14), `editeur`, `demandes-jp` | | Oreille ; personne |
| Un fait se dit une fois par chapitre | 6 | `CLAUDE.md`, cadre, skill (« La répétition », 658 mots), `roles.md`, `decisions-jp.md`, `controle.py` | Le skill renvoie à des sections qui n'existent plus (« le section 3 », « l'encadré du section 8 », « le détail ») | Script (suites de 6 mots) ; l'idée redite autrement, à l'oreille |
| Les rappels de sécurité dans leur étape | 6 | `CLAUDE.md` (tableau), cadre, skill (deux endroits), `editeur`, `roles.md`, `controle.py` | Le skill les veut « dans l'étape et dans l'encadré du section 8 », qui n'existe plus | Script bloquant (invariant avant et après) |
| La série orange | une douzaine de places dans 4 fichiers | `CLAUDE.md`, cadre (7 cases), skill (« Le réel de l'urgence » et huit lignes du tableau du 15 octobre, dont la ligne 330 abolie par la ligne 332 sans être enlevée), `decisions-jp.md` | | Oreille |
| Mots bannis (village, char, Baie-Comeau, JP, l'âge des enfants) | 5 | `CLAUDE.md`, skill, cadre (partie planches), `decisions-jp.md`, `controle.py` | | Script bloquant ; 0 au tome 1 refait, mais « village » revient 117 fois et « Baie-Comeau » 4 fois dans les tomes 2 à 6 |
| Aucun numéro de norme, de téléphone ni d'attribution | 3 | `CLAUDE.md`, gabarit, `decisions-jp.md` | | Aucun script ; le livre en a 0, une passe l'a fait |

Ce que montre le tableau : une règle de forme exacte, même redite neuf fois, finit appliquée, parce qu'un script la
vérifie. Une règle d'oreille, redite six fois, ne l'est pas davantage qu'avec une seule copie ; les copies ne font que
diverger.

---

## 4. Ce qu'un agent peut réellement appliquer

**Le nombre.** Un éditeur a devant lui 39 cases « Le texte » et 8 cases « La langue » dans le cadre, 16 règles et 53
lignes de tableau dans le skill `ecriture`, 9 lignes et 5 étapes dans `editeur`, les formes du gabarit et la section
« L'écriture » de `CLAUDE.md` : plus de cent consignes, dont certaines se contredisent. La littérature sur les listes de
contrôle donne « de cinq à neuf éléments, la limite de la mémoire de travail », et rappelle que ces listes « ne sont pas
des guides complets » (Gawande, cité par L3, S14). Notre cadre, lui, a une case de 523 mots.

**Ce qui gagne.** Devant cent consignes, un agent applique celles qu'il peut vérifier phrase par phrase et qu'un script
lui confirme : le tiret, le mot banni, « ceux qui » en tête, le mot de livre de la liste. Les consignes qui portent sur
le paragraphe ou sur l'oreille ne se vérifient pas phrase par phrase, et la passe ne leur fait pas de place : l'étape 6
demande de relire à voix haute, puis de « repasser le tableau ligne par ligne », soit 3 310 mots de corrections à
confronter à chaque chapitre. Aucun ordre de priorité n'est écrit (R1) ; en cas de conflit, la règle la plus mécanique
l'emporte.

**L'archéologie.** Le skill parle encore de « Pourquoi ça marche », de « l'encadré du section 8 », de la « section 9 »
et des parties « … : le détail », qui n'existent plus ; le gabarit compte « neuf points ». Un agent qui veut savoir ce
qui vaut aujourd'hui doit comparer des dates. Il ne le fait pas : il applique les deux.

**Le mélange des métiers.** La partie « Le texte » du cadre mêle l'écriture et la mise en pages : les coordonnées d'un
logigramme en double page (8,625 à 15,5 po), le comportement du moteur des notes vertes, l'ordre des pages du début du
tome. Un rédacteur lit ces consignes à chaque brief et n'en applique aucune.

**L'exemple apprend sa surface.** Un exemple qu'on donne comme modèle se recopie. La ligne de matériel du gabarit
(« Ne se fabrique pas. ») revient au ch. 101, l. 86, avec son pronominal ; les trois lignes de la table du mot qu'on
dit reviennent au mot près dans la page du monoxyde. Un exemple doit donc respecter toutes les autres règles, et montrer
un paragraphe entier plutôt qu'un fragment.

---

## 5. Principe, exemple, histoire : ce que contient le skill `ecriture`

| Partie du skill | Mots | Nature |
| --- | --- | --- |
| En-tête et description | 168 | La description parle encore de « la structure des neuf points » |
| « Ce que JP a dit » | 471 | Histoire |
| « Le test » | 42 | Principe |
| « Comment s'écrit une phrase » (règles 0 à 15, avec la table du mot qu'on dit) | 1 896 | Principes avec exemples ; les règles 11 à 15 racontent aussi leur histoire |
| « Ce qui sort » : les phrases | 635 | Liste d'exemples (13 lignes) |
| « Ce qui sort » : les mots | 173 | Liste de mots (7 lignes) |
| « Le réel de l'urgence » | 183 | Principe, propre à la série orange |
| « La répétition » | 658 | Principe, en partie périmé |
| « Le tiret » et « Les guillemets » | 155 | Principe |
| « Les planches se nomment » | 101 | Forme du chapitre (sa place est le gabarit) |
| « Ce qui ne sort jamais » | 151 | Principe (ce qui protège) |
| « Ce que la relecture du 15 octobre change à la passe » (26 lignes) | 3 310 | Histoire, avec un principe noyé dans la troisième colonne |
| « La passe sur un chapitre » | 274 | Méthode |
| « Avant de rendre » | 226 | Liste de contrôle ; une seule case touche l'oreille (« se lit d'un trait ») |

En gros : 45 % d'histoire, 37 % de principes avec leurs exemples, 10 % de listes, 7 % de méthode. Un skill qu'on lit
pour écrire devrait être l'inverse : des principes courts, chacun avec sa condition et un exemple choisi, une méthode, et
l'histoire ailleurs, là où on la cherche quand on veut savoir d'où vient une règle (c'est le travail de
`decisions-jp.md`).

**Ce qui distingue un principe d'une liste.** Un principe dit le défaut et sa raison (« le lien entre deux faits se dit
par un mot ; le deux-points le cache »), avec la condition (« dans la prose qui explique ; dans une étape, le geste
d'abord »). Une liste dit des mots à chasser (« d'où », « devient flamme », « lorsque »). La liste est utile à un script,
pour désigner une phrase à relire ; elle est nuisible dans le skill, parce que l'agent qui la lit croit avoir appliqué la
règle quand il a remplacé le mot.

---

## 6. Ce qui se vérifie par script, ce qui demande une oreille

Trois sortes de contrôle, à ne pas mélanger :

**Le contrôle bloquant** (un script, un code de sortie, 0 exigé). La règle est exacte ; une machine la juge mieux qu'un
lecteur.

| Règle | Aujourd'hui | À ajouter |
| --- | --- | --- |
| Tiret, « § », mots bannis | `controle.py` | Rien |
| Ancres de planches ; chiffres, renvois et rappels qui disparaissent | `controle.py --avant` | Rien |
| Langue, 0 avis | `langue.py`, l'assembleur | Rien |
| Numéro de norme, téléphone, service qui répond, attribution (CSA, ASTM, 911, Info-Santé, MAPAQ, Santé Canada…) | Rien (0 dans le livre aujourd'hui) | Une liste dans `controle.py`, pour la grande passe des tomes 2 à 6 |
| La forme du chapitre : les sept sections dans l'ordre, plus de « Pourquoi ça marche » ni de section Danger, 5 à 8 lignes par tableau de contrôle et d'échec, Matériel de 15 à 20 mots par ligne, notes « En plus » de 30 à 80 mots, dangers de 150 à 230 mots, chaque planche appelée | Rien | Une partie « Forme » dans `controle.py` |
| Les renvois « ch. N, section M » qui pointent une section qui n'existe pas | Rien | La même partie ; le tome 1 en a déjà qui visent la « section 9 » de chapitres pas encore migrés (ch. 12, l. 107 : « ch. 25, section 9 ») et qui seront faux après la grande passe |

**Le signal** (un script désigne un passage ; quelqu'un le lit et juge). La règle demande un jugement, mais une machine
peut dire où regarder.

| Signal | Aujourd'hui | Ce qui change |
| --- | --- | --- |
| Tournures, maximes, mises en relief, mots de livre, redites | `controle.py` | Les listes sortent du code et deviennent un fichier de données que le skill et le script lisent tous les deux |
| Mots vides | `controle.py` (19 mots) | À réduire : la liste chasse aussi les liens (R1, C4). Dans le paragraphe du monoxyde, elle signale « toute » dans « dans toute la pièce », qui est le fait même |
| Pronominal de consigne | Annoncé par le cadre, absent du script | À ajouter, « se » + verbe de geste dans une étape |
| Le tempo par paragraphe : deux « fait : conséquence » de suite, aucun mot de liaison dans un paragraphe de quatre phrases et plus, trois phrases du même moule ou de même entrée | `tempo.py`, par fichier seulement, branché nulle part | Par paragraphe, la prose et les étapes comptées à part ; la colonne « si » corrigée (L5, section 5) |

Un signal ne devient jamais une cible : quand une mesure devient le but, on écrit pour la mesure (L5, principe 12 ; c'est
la loi de Goodhart). Les repères chiffrés de L5 servent à choisir quoi relire, pas à dire quoi écrire.

**L'oreille** (un lecteur, et rien d'autre). Doit-il exister ? Est-il à sa place ? Le paragraphe suit-il ce qui arrive ?
Quel est le lien entre ces deux phrases ? Ce mot se dit-il ? La notion est-elle expliquée ? Le fait qui surprend se
lit-il comme une surprise ? L'orange suit-il la scène réelle ? Le même fait revient-il avec d'autres mots ? Aucun script
ne répond à ces questions ; ce sont pourtant celles de toutes les plaintes de JP sur l'épreuve. C'est là que vont les
auditeurs.

---

## 7. La structure proposée

### 7.1 Cinq principes d'architecture

1. **Une règle, une place.** Chaque règle a un numéro et vit dans un seul fichier. Les autres fichiers la citent par son
   numéro, sans la recopier. Une règle qu'on change, on la change à un endroit ; une règle qu'on enlève disparaît pour
   de bon.
2. **Chaque règle porte cinq choses** : l'énoncé ; la condition (où elle vaut, où elle ne vaut pas, celle que JP avait
   posée) ; un exemple choisi, un paragraphe entier qui respecte toutes les autres règles ; son contrôle (script, signal,
   auditeur) ; un renvoi à son origine dans `decisions-jp.md`.
3. **Le skill se lit d'un trait.** 2 000 mots au plus, contre 8 443 ; le détail se charge quand on en a besoin, comme le
   skill `planches` le fait déjà avec `references/`.
4. **L'histoire vit dans `decisions-jp.md`.** Les mots de JP, datés, avec la page et la phrase, et le numéro de la règle
   qu'ils ont faite ou corrigée.
5. **Les règles s'écrivent dans le tempo qu'elles demandent**, sans pronominal de consigne : un agent écrit comme le
   dernier texte qu'il a lu.

### 7.2 Les fichiers

```
CLAUDE.md                          le fond ; pour l'écriture, cinq lignes et le renvoi aux skills
gabarit-chapitre.md                la forme du chapitre, source unique : sections, Matériel, tableaux,
                                   série orange, logigramme, notes « En plus », appels de planche
.claude/skills/ecriture/
  SKILL.md                         2 000 mots au plus : le lecteur, l'ordre de priorité, deux sortes
                                   de texte, une douzaine de principes, la méthode
  references/exemples.md           des paragraphes entiers, avant et après, rangés par principe ;
                                   les passages modèles retenus de L1 à L5
  references/mots.md               le mot qu'on dit, les mots de livre, les mots bannis, les normes et
                                   les services : une liste, lue aussi par controle.py
  auditeurs/oreille.md             une fiche par auditeur : son regard, 5 à 9 questions, ce qu'il rend
  auditeurs/lecteur-naif.md
  auditeurs/consignes.md
  scripts/controle.py              le bloquant (tirets, mots, normes, ancres, invariants, forme)
  scripts/tempo.py                 les signaux, par paragraphe, prose et étapes à part
.claude/skills/editeur/SKILL.md    la passe d'existence et de place ; reçoit les rapports des auditeurs
                                   et réécrit une seule fois ; le texte de JP du 28 octobre gardé tel quel
.claude/skills/langue/             la langue, comme aujourd'hui ; la frontière entre le parlé correct et
                                   le joual y est dite une fois, et le skill ecriture y renvoie
.claude/cadre-agents.md            court : « Pour tout agent », puis 5 à 9 cases par rôle, avec les
                                   numéros des règles
roles.md                           la chaîne avec les auditeurs, les prompts à jour
plan/decisions-jp.md               l'origine : les mots de JP datés, chacun avec le numéro de sa règle
plan/audit-ecriture/banc-essai/    les paragraphes que JP a signalés, avant et après, et son verdict
```

### 7.3 Ce qui déménage

| D'où | Quoi | Où ça va |
| --- | --- | --- |
| `CLAUDE.md`, « L'écriture » (578 mots) | La méthode et les familles de « fils d'la AI » | Le skill ; `CLAUDE.md` garde cinq lignes : tout passe par `ecriture` puis `langue` ; on écrit comme on l'expliquerait à voix haute, en français québécois correct ; tout est informatif ; aucun tiret ; les mots bannis |
| `CLAUDE.md`, « Le gabarit » (777 mots) | Les sept sections, les tableaux, « En plus », l'orange | Le gabarit ; `CLAUDE.md` garde la liste des sept sections et le renvoi |
| Skill, « Ce que JP a dit » et le tableau du 15 octobre (3 781 mots) | Les phrases de JP et les défauts de méthode | `decisions-jp.md`, section « L'écriture », chaque ligne avec le numéro de sa règle ; les corrections deviennent des paragraphes dans `references/exemples.md` |
| Skill, tableaux « Ce qui sort » | Les exemples | `references/exemples.md`, en paragraphes |
| Skill, table du mot qu'on dit ; `controle.py`, `LIVRESQUE`, `BANNIS`, `MOTS_VIDES`, `VOCAB_IA` | Les listes | `references/mots.md`, lu par le script |
| Skill, « Le réel de l'urgence », « Les planches se nomment » | La forme | Le gabarit |
| Skill `editeur`, le tableau des demandes de JP | Des règles déjà ailleurs | Des renvois aux numéros |
| Cadre, « Les planches » (1 487 mots) | Les règles des planches | `.claude/skills/planches/references/brief-agent.md`, que le cadre nomme déjà « le cadre complet » |
| Cadre, « Le montage » (1 236 mots) et les cases de mise en pages de « Le texte » | Le moteur, les pages, les coordonnées | Le prompt du metteur en pages (`roles.md`) et `plan/normes-graphiques.md` |
| Gabarit, les parties mortes | « Neuf points », « Pourquoi ça marche », la section 8, la réglementation, le relecteur | Coupées (R1, M1 à M6) |

### 7.4 Le skill court

Dans cet ordre, avec un budget de mots pour tenir sous 2 000 :

1. **Le lecteur et la situation** (80 mots) : un parent compétent de ses mains, à la lampe frontale, qui lit souvent à
   voix haute pour les autres.
2. **L'ordre quand deux règles tirent en sens contraire** (80 mots) : la sécurité et le fait d'abord ; ensuite, se
   comprendre du premier coup à voix haute ; ensuite, le paragraphe qui se suit ; ensuite, la concision ; les listes de
   mots en dernier. Aujourd'hui, cet ordre n'est écrit nulle part.
3. **Deux sortes de texte** (150 mots) : l'étape (avec la série orange, le logigramme, le Matériel) et la prose qui
   explique (les pages des dangers, le mécanisme dans une étape, les notes). Chacune a ses règles ; c'est la distinction
   que la littérature technique fait d'abord (L3, section 3).
4. **Une douzaine de principes** (75 à 100 mots chacun, au format de la section 8 plus bas). Proposition de liste, à
   arrêter avec les conclusions de R1 et de L1 à L5 :
   - E1. Dire la phrase à voix haute : elle se comprend du premier coup (la règle 0).
   - E2. Le passage doit exister et être à sa place : il apprend quelque chose sur ce qu'on fait, il parle du sujet du
     chapitre, un fait ne s'y dit qu'une fois.
   - E3. Le paragraphe suit ce qui arrive à la personne, et chaque phrase reprend la précédente.
   - E4. Le lien entre deux faits se dit par un mot ; le deux-points annonce, il ne relie pas une cause.
   - E5. Les longueurs varient, et la phrase finit sur ce qui compte.
   - E6. On sait qui fait le geste : le sujet se nomme, la consigne se dit comme une consigne, jamais au pronominal.
   - E7. L'étape : un geste par phrase, la condition avant, le signe qu'on voit après, la raison après si elle montre
     un risque qu'on ne verrait pas.
   - E8. Le mot qu'on dit, en français correct (la frontière avec le joual est au skill `langue`).
   - E9. Le même mot pour la même chose, d'un bout à l'autre du chapitre.
   - E10. Le fait, pas l'effet : ni phrase sur le livre, ni image, ni chute, ni maxime, ni chose qui pense, ni
     opposition fabriquée.
   - E11. Le fait qui surprend se dit comme une correction : ce que les gens font d'habitude, puis ce qui est vrai.
   - E12. Une notion ou un signe s'explique la première fois qu'il paraît (en note, pour un signe).
   - E13. La ponctuation : aucun tiret ; le deux-points pour annoncer ; le point-virgule permis.
5. **La méthode** (150 mots) : écrire le paragraphe dans l'ordre de ce qui arrive ; le dire à voix haute en entier ;
   passer les scripts ; ne pas se relire pour l'oreille, c'est le travail des auditeurs.
6. **Les renvois** (50 mots) : le gabarit, `references/`, les auditeurs, le skill `langue`.

### 7.5 Les auditeurs

R1 (section 6), L1 (section 8), L2 (section 8), L3 (section 9), L4 (section 8) et L5 (section 10) proposent ensemble une
quinzaine d'auditeurs qui se recoupent. Je les ramène à trois agents et un jeu de scripts, pour deux raisons : la règle
des jetons de JP (un agent par petite tâche, le coût dit avant), et le fait qu'un auditeur de plus relit le chapitre en
entier. Les regards qui ne deviennent pas un agent entrent comme une question dans la fiche d'un autre.

**Ce qui vaut pour tous.** L'auditeur n'a pas écrit la page. Il lit des paragraphes entiers, à voix haute. Il ne
réécrit pas le chapitre : pour chaque cas, il donne la ligne, une citation de douze mots au plus, ce qui accroche, une
proposition en une phrase et le numéro du principe. Quand le même défaut revient, il le dit une fois avec la liste des
lignes (« 14 paragraphes : le deux-points de cause ») : on corrige une habitude, pas des fragments. Sa fiche a de cinq à
neuf questions. Il ne lit que sa portée. Il reçoit `CLAUDE.md` (chargé d'office), la partie « Pour tout agent » du
cadre, sa fiche et le texte ; pas le skill au complet.

**A0. Les mesures** (des scripts, pas un agent). `controle.py` (le bloquant et les signaux), `tempo.py` par paragraphe,
`langue.py`. Ils passent à la fin du rédacteur, puis après l'éditeur. Leurs signaux disent aux auditeurs quels
paragraphes lire d'abord.

**A1. L'oreille** (la prose qui explique : les pages des dangers, les sections 1, 2 et 7 hors étapes, les mécanismes
dans les étapes, les notes). Son regard : le paragraphe lu d'un trait à voix haute. Ses questions :
1. Où le souffle casse-t-il ?
2. À chaque frontière de phrase et à chaque deux-points, quel est le rapport ? Est-il dit par un mot ?
3. Le paragraphe suit-il ce qui arrive à la personne, ou faut-il revenir en arrière ?
4. Deux ou trois phrases de suite ont-elles le même moule ou la même entrée ?
5. Chaque phrase finit-elle sur ce qui compte ?
6. Y a-t-il un mot ou un tour qu'on n'entend jamais dire ?
7. Le fait qui surprend se lit-il comme une surprise ?
Il reprend les regards des joints, du souffle, des coupes, de la chute, du gueuloir, du mot et du réflexe proposés par R1,
L1, L2 et L4.

**A2. Le lecteur naïf** (tout le chapitre). Son regard : un parent compétent de ses mains, qui n'a jamais fait ce geste
et n'a lu ni les sources, ni les règles, ni le chapitre. Il doit être un agent neuf ; sinon il n'est plus naïf. Ses
questions :
1. Après chaque étape, qu'est-ce que vous feriez, dans l'ordre ? (C'est la compréhension qu'on mesure, pas le goût :
   L3, S8.)
2. Quel mot, quelle notion, quel signe avez-vous dû deviner ?
3. Où avez-vous dû chercher de quoi parlent « il », « son », « ce » ?
4. Quelle chose préparée d'avance est utilisée sans être expliquée ?
5. Quelle phrase ne vous apprend rien que vous ne saviez déjà ?
6. Quelle phrase avez-vous relue deux fois ?
Il reprend le lecteur naïf de L4, l'auditeur de la compréhension de L3, et les plaintes « c'est quoi les 4 horloges »,
« c'est quoi un carter », « c'est quoi l'affaire avant le 8 ».

**A3. Les consignes** (les sections 3 à 7 et le logigramme). Son regard : la personne qui fait le geste, la lampe au
front. Ses questions :
1. Chaque phrase porte-t-elle un geste, à l'infinitif ?
2. Sait-on qui fait le geste (aucun pronominal) ?
3. La condition, le lieu et le pictogramme viennent-ils avant le geste, et le signe qu'on voit après ?
4. La raison vient-elle après le geste, et seulement quand elle montre un risque qu'on ne verrait pas ?
5. La série orange suit-elle la scène réelle (rien de préparé, ce qui sauve d'abord), et la pastille dit-elle le temps
   qu'on a ?
6. Le logigramme fait-il des phrases complètes, pose-t-il des questions qui se répondent par oui ou non, sans redire un
   avertissement ?
7. Le Matériel ne garde-t-il que l'indispensable, et chaque ligne de tableau change-t-elle une décision ?
8. Une étape de plusieurs gestes est-elle découpée, avec ses repères de planche dans l'ordre ?
Il reprend l'auditeur des consignes de L3 et le personnage de L4.

**Ce qui ne devient pas un auditeur, et pourquoi.**
- L'existence et la place (doit-il exister, le chapitre parle-t-il de son sujet, le même fait revient-il) : c'est le
  `/diagnostiquer` de l'éditeur, qui est le seul à couper. Un auditeur qui coupe ferait un deuxième rédacteur.
- La condition de JP (R1) : une fois que chaque règle porte sa condition (principe 2 de la section 7.1), la liste des
  coupes de l'éditeur se lit contre elle ; pas besoin d'un agent.
- La langue : le correcteur existe.
- Le gras et les liens (R1) : la question 2 de A1, plus un compte des mots de liaison avant et après dans
  `controle.py --avant`, pour voir si une passe en a coupé.

### 7.6 La place dans la chaîne

```
Rédacteur → A0 → Vérificateur technique → A1 oreille      ┐
                                          A2 lecteur naïf  ├→ Éditeur → A0 (avant et après) → Correcteur → Metteur en pages → JP
                                          A3 consignes     ┘
```

- **Les auditeurs passent après le vérificateur**, sur un texte dont les faits sont arrêtés ; ils ne proposent aucun fait
  neuf.
- **Ils passent avant l'éditeur, en même temps, et sans se voir.** L'éditeur reçoit les trois rapports et réécrit une
  seule fois ; il répond à chaque cas (« fait », ou « non » et pourquoi). Un seul tour, aucun aller-retour : c'est la
  règle des planches du 19 octobre, appliquée au texte.
- **A0 repasse après l'éditeur** : le contrôle avant et après dit si un chiffre, un renvoi ou un rappel a disparu. Le
  vérificateur ne relit que ce qui a changé de sens (la règle du cadre, l. 274 à 278).
- **Le correcteur passe en dernier sur le texte**, parce que l'éditeur réécrit.
- **JP reste le regard final.** On lui montre la page après le correcteur, comme aujourd'hui.

**Le coût, en mots lus au départ par chaque agent.** Aujourd'hui, l'éditeur lit environ 25 000 mots avant d'agir
(`CLAUDE.md` 3 488, cadre 5 816, `editeur` 1 128, `ecriture` 8 443, le chapitre environ 6 000). Avec la structure
proposée, un auditeur lit environ 9 500 mots (`CLAUDE.md` allégé, environ 2 500 ; « Pour tout agent », environ 550 ; sa
fiche, environ 400 ; le chapitre), et l'éditeur environ 12 800 (avec le skill court, son skill et les trois rapports).
Trois auditeurs et l'éditeur lisent donc ensemble environ 41 000 mots, 1,6 fois l'éditeur d'aujourd'hui ; si A1 et A3
sont un seul agent qui fait deux passes séparées (la prose, puis les étapes), le total tombe à environ 32 000, 1,3 fois.
Le coût réel dépend du nombre d'appels de chaque agent ; un auditeur qui lit et rend un rapport en fait peu. Ce coût se
dit à JP avant la grande passe (règle des jetons).

### 7.7 Comment une correction de JP entre

C'est le remplacement de la règle « dans le skill et dans le cadre, le jour même ». Le jour même, toujours ; à une seule
place, désormais.

1. **Ses mots**, datés, avec la page et la phrase, entrent dans `decisions-jp.md`, section « L'écriture ».
2. **On cherche le principe qu'il touche.** Si le principe existe, le paragraphe signalé entre dans
   `references/exemples.md`, en entier, avant et après ; et si la règle a coupé trop large ou trop court, on corrige sa
   condition. Si aucun principe ne le couvre, on en écrit un, à une seule place, et on ajoute une question à la fiche de
   l'auditeur qui l'aurait vu.
3. **Si c'est une forme exacte** (un mot, un signe de ponctuation, une limite de lignes), elle entre dans la liste que le
   script lit.
4. **Le cadre ne change** que si la correction crée une case qui tue : une erreur que JP a vue deux fois, ou qui coûte
   une épreuve.
5. **Le paragraphe entre dans le banc d'essai** (section 7.8).
6. **La règle remplacée sort le même jour**, de sa seule place.

On n'ajoute jamais le fragment corrigé comme une règle, et on ne recopie jamais la correction dans quatre fichiers.

### 7.8 Le banc d'essai

Un dossier de paragraphes que JP a signalés, chacun avec sa version d'avant, sa version d'après et le verdict de JP : la
page du monoxyde, le paragraphe « On est tenté… » de la génératrice (coupé), les quatre horloges du ch. 1, la section 2
du ch. 1, la section 3 du ch. 3 (les « paraboles »), la braise du ch. 13, la vidange de l'étape 23 du ch. 3, « Régler
dehors » du ch. 17. Chaque nouvelle version du skill passe par lui : un agent qui n'a que le skill récrit les versions
d'avant, `tempo.py` les mesure à côté du corpus de L5, et JP en lit deux ou trois avant qu'on lance un chapitre. C'est
l'équivalent d'un test : on voit qu'une règle est mauvaise sur dix paragraphes, pas sur 95 chapitres.

### 7.9 L'ordre de la migration, et les décisions qui sont à JP

Le moment compte : les tomes 2 à 6 (95 chapitres) attendent la grande passe. Ce qu'on écrit maintenant sera appliqué 95
fois.

Trois décisions changent `CLAUDE.md` et sont donc à JP :
1. Le cadre ne se colle plus au complet ; chaque agent reçoit « Pour tout agent » et la partie de son rôle.
2. Une correction de JP entre à une seule place (section 7.7), au lieu du skill et du cadre.
3. Les auditeurs entrent dans la chaîne pour le texte, malgré « pas de tour de relecture d'agents » ; la règle des
   planches du 19 octobre ne change pas.

Ensuite, dans l'ordre :
1. Déplacer l'histoire dans `decisions-jp.md` (rien ne se perd), puis écrire le skill court, `references/` et les fiches
   d'auditeurs.
2. Récrire le gabarit aux sept sections et y rassembler la forme ; alléger `CLAUDE.md` et le cadre ; mettre `roles.md` à
   jour.
3. Adapter les scripts : les listes dans `references/mots.md`, la partie « Forme », le pronominal, les normes et les
   services, `tempo.py` par paragraphe.
4. Passer le banc d'essai ; JP lit la page du monoxyde et deux autres.
5. Faire passer deux ou trois chapitres du tome 1 par la nouvelle chaîne, avec le coût noté, et les montrer à JP.
6. Le reste du tome 1, puis la grande passe.

---

## 8. Un principe, tel qu'il s'écrirait dans le skill court

Pour montrer le format (énoncé, condition, exemple, contrôle, origine). L'exemple garde les faits de la page du monoxyde
(`dangers/partie-1.md`, l. 3), sans rien ajouter ; il ressemble aux essais de R1 (section 7) et de L1 à L5, et c'est
normal : ce qui compte ici, c'est la forme de la fiche.

> **E4. Le lien se dit par un mot.** Quand deux faits ont un rapport (une cause, une conséquence, une condition, une
> surprise), on dit ce rapport avec le mot qu'on emploierait en parlant : parce que, alors, donc, comme, quand, mais,
> sinon. Le deux-points annonce une liste, un exemple ou une ligne de matériel ; il ne remplace pas « alors ».
>
> **Où ça vaut.** Dans la prose qui explique. Dans une étape, le geste vient d'abord, et la raison suit dans sa propre
> phrase ou après « parce que ».
>
> **Avant**, 4 phrases, 2 deux-points de conséquence, aucun mot de liaison :
> « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. Le gaz ne se voit pas et ne se sent pas. Il prend la place de
> l'oxygène dans le sang : on s'endort sans s'en rendre compte, au lieu de sortir. Il se répand dans toute la pièce,
> jusqu'au plancher : se coucher par terre ne protège pas. »
>
> **Après**, les mêmes faits, aucun deux-points, quatre entrées de phrase différentes :
> « Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone, et le poêle en fait plus
> quand on ferme presque l'entrée d'air pour la nuit. On ne voit pas ce gaz-là et on ne le sent pas. Il prend la place
> de l'oxygène dans le sang, alors on s'endort sans s'en rendre compte, au lieu de sortir. Comme il se répand dans toute
> la pièce, jusqu'au plancher, se coucher par terre ne protège pas. »
>
> **Contrôle.** Signal de `tempo.py` (deux « fait : conséquence » de suite ; un paragraphe de quatre phrases sans mot de
> liaison) ; question 2 de l'auditeur A1.
>
> **Origine.** JP, 15 et 16 octobre 2026, ch. 3 (« c'est la façon que le paragraphe est organisé ») ; 28 octobre 2026,
> la page du monoxyde (« le tempo du paragraphe est pas bon »). `decisions-jp.md`, section « L'écriture ».

Mesures de l'essai : avant, 77 mots, 50 % de phrases en « fait : conséquence », 0 mot de liaison, trois phrases sur
quatre qui commencent par « Le » ou « Il » ; après, 80 mots, 0 %, 25 mots de liaison pour 1000, aucune entrée répétée. `controle.py` : 0
tiret ; un seul signal, « toute » dans « dans toute la pièce », qui est un faux avis (c'est le fait). `langue.py` : 0
avis.

---

## 9. Les mots de JP qui touchent l'architecture

| Ce que JP a dit | Quand, où | Ce qu'il voulait | Ce que la règle en a fait | Fidèle ? |
| --- | --- | --- | --- | --- |
| « ça sert à rien de faire ça si on refait toujours les mêmes erreurs » | 16 oct., cadre, l. 3-4 | Que les corrections tiennent d'un agent à l'autre | Le cadre collé au complet, chaque correction dans le skill et dans le cadre le jour même | En partie : l'intention est servie, mais par copie ; les copies divergent et les vieilles restent |
| « on avait dit plus de phrases de même ; arrête les tournures de phrase de même » | 16 oct., ch. 13 (skill, l. 336) | Que la règle de la veille (les paraboles) vaille aussi dans une seule phrase | Une ligne de plus au tableau, et des motifs de mots dans le script | Non : la règle de la veille était dans le tableau, l'agent l'a refaite sous une autre forme ; un fragment interdit ne protège pas de la forme voisine |
| « on en avait déjà parlé ; parle pas de même, explique pourquoi » | 16 oct., ch. 3 (skill, l. 338) | Ne pas refaire au ch. 3 ce qui avait été corrigé au ch. 11 | « Toute phrase que JP corrige entre dans ce tableau le jour même » | En partie : la correction circule, mais en fragment, et le tableau grossit |
| « j'ai l'impression que tu as recommencé à faire des tournures de phrase bizarres » | 18 oct., pages des dangers (skill, l. 342) | Un regard extérieur sur ce que l'auteur ne voit pas | « Toute page écrite par un agent passe ensuite par un éditeur qui ne l'a pas écrite » | Oui sur le principe, mais contredit par « pas de tour de relecture d'agents » (R1, C13) |
| « c'est moi le regard qualité » ; « 4 M de jetons pour 6 planches, sérieusement ? » | 19 oct., planches | Pas de boucle coûteuse de relecteurs sur les images | Étendu à « l'image ou la page » dans `CLAUDE.md` le 20 octobre | Non pour le texte (R1, C13) ; la contrainte de coût, elle, reste juste : un seul tour, des fiches courtes |
| « est-ce qu'il y a une façon de réduire le contexte ? » | 20 oct., cadre, l. 25 | Moins de jetons par agent | `CLAUDE.md` allégé ; un agent par sujet | En partie : le cadre au complet (5 816 mots, dont près de la moitié hors du sujet d'un rédacteur) et le skill de 8 443 mots vont contre |
| « c'est pas juste les logigrammes, c'est la façon de dire les choses » | 15 oct., ch. 17 (skill, l. 31) | Un principe d'oreille qui vaut partout | La règle 0, juste, mais testée sur la phrase seule | En partie |
| « On a sommeil, qui qui dit ça dans vrai vie, la façon que tu écris c'est pas bon » | 28 oct., page du monoxyde | La façon d'écrire | Une table de 16 fragments dans le skill et 43 motifs dans le script | Non : réduit au mot (R1, C10) ; la table a fourni trois morceaux du paragraphe qu'il a jugé ensuite |
| « le tempo du paragraphe est pas bon pi c'est vrai dans tout le livre » | 28 oct., épreuve du tome 1 | Le paragraphe, partout | Aucune règle encore | Non |
| « Lance un audit d'écriture de texte, repasse toute nos règle et réécrit le skill en lisant de la litérature et en ajoutant des auditeur. Je veux qu'on reparte sur des bonnes bases. » | 28 oct. | Des règles refaites à partir de principes, et des relecteurs qui n'ont pas écrit | Cet audit | À faire : la structure de la section 7 |

---

## 10. Liste de contrôle (ma partie du cadre : « Pour tout agent », « Le texte », « La langue »)

Pour tout agent
- [x] `CLAUDE.md` pris comme chargé ; pas relu.
- [x] Les skills de ma partie lus au complet : `ecriture`, `editeur`, `langue`, avec le gabarit, `roles.md` et
  `decisions-jp.md`.
- [ ] `suivi/plan-de-match.md`, section « PAUSE du 15 octobre » : pas lu au complet ; la tâche ne touche aucun chapitre,
  et seul le début a été regardé pour savoir ce qu'on y garde.
- [x] Règle 1 : aucun chiffre neuf dans l'exemple ; les chiffres de ces notes sont des comptes faits sur le dépôt.
- [x] Rien commité.
- [x] Jetons : recherche avant lecture, lectures par plages, sorties coupées ; R1 et L1 à L5 lus par leurs sections
  utiles seulement.

Le texte (seulement ce qui touche l'exemple de la section 8 ; le reste est sans objet, aucun chapitre n'est touché)
- [x] Règle 0 : l'exemple se dit à voix haute et se comprend du premier coup.
- [x] Pas de loi en formule, de maxime, de chute, d'image ni de chose qui pense.
- [x] Aucune consigne au pronominal dans l'exemple (« on ne voit pas ce gaz-là »).
- [x] Le mot qu'on dit : « ce gaz-là », « alors », « comme ».
- [x] Aucun tiret dans les notes ni dans l'exemple (`controle.py` sur l'exemple : 0).
- [x] `controle.py` passé sur l'exemple ; le seul avis (« toute ») jugé : faux avis.
- [x] Aucun fait ni chiffre neuf dans la réécriture.
- [ ] Forme du chapitre, série orange, planches, logigramme : sans objet.

La langue
- [x] `langue.py` passé sur l'exemple réécrit : 0 avis.
- [x] Relu phrase par phrase : les accords, « ce gaz-là », « au lieu de sortir », la négation complète.
- [ ] Notes dans `suivi/NN-redaction.md` : sans objet (aucun chapitre).
