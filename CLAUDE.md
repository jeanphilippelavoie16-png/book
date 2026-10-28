# Le Manuel du Nord : instructions du projet

Ce fichier est lu au début de chaque session. Il prime sur tout le reste. Il ne garde que les règles : d'où vient
chacune, avec les mots de JP, les dates et les exemples, est dans `plan/decisions-jp.md` (pas chargé à chaque session).

## Ce qu'on fait

Un ouvrage de référence en **6 tomes, 112 chapitres**, sur la conservation des aliments, la subsistance et l'autonomie,
adapté à la Côte-Nord (forêt boréale, hivers à -35 °C, saison de jardin de 90 à 100 jours, orignal, truite, fleuve salé).

- Tome 1, « Tenir » (ch. 1 à 18 ; le 00 et le 00b sont coupés)
- Tome 2, « Le corps » (ch. 19 à 40)
- Tome 3, « Prélever » (ch. 41 à 60)
- Tome 4, « De la bête au garde-manger » (ch. 61 à 81)
- Tome 5, « La forêt, le jardin et le chalet » (ch. 82 à 101)
- Tome 6, « L'atelier » (ch. 102 à 112)

La table des matières est dans `plan/tomes-6-proposition.md`, la correspondance ancien → nouveau numéro dans
`plan/renumerotation.json`. Les fiches de `suivi/` et les `sources/` d'avant le 27 septembre 2026 citent les
**anciens** numéros.

**Lecteur type :** une famille avec de jeunes enfants. Le lecteur sait souder, câbler du 12 V et abattre un orignal ; il
n'a jamais salé une cuisse ni tanné une peau. On écrit pour quelqu'un de compétent de ses mains et débutant en
conservation.

**Format d'impression :** Lulu, Print Book, 8,5 × 11 po (US Letter), couverture rigide Case Wrap, intérieur Premium
Color, papier blanc couché 80#, fini mat ; 800 pages au plus par tome.

## Ce que ce livre est, et ce qu'il n'est pas

Un manuel pour survivre et s'adapter après une catastrophe, quand on n'a rien ; pas un manuel de la CNESST. Le test de
chaque page : **il n'y a personne à appeler** (pas d'entrepreneur, pas de quincaillerie ouverte, pas de pièce en
commande, pas d'inspecteur). Une phrase qui suppose le contraire saute.

| Ça, ça sort | Ça, ça reste |
| --- | --- |
| « Faire appel à un professionnel certifié » | Comment le faire soi-même |
| **Tout numéro de norme** | Ce que la pièce doit faire |
| « Ne tentez pas ceci vous-même » | Ce qui arrive si on s'y prend mal, et comment s'y prendre bien |
| « Remplacer la pièce » | Comment réparer la pièce, ou la fabriquer |
| « Porter l'équipement de protection réglementaire » | Ce que le geste fait au corps, et quoi mettre entre les deux |

**Aucun numéro de norme dans le livre. Aucun** : ni CSA, ni CAN/CSA, ni NF EN, ni ASTM, ni ULC, ni ANSI, ni ISO, ni NFPA,
même « pour référence ». Ce qui reste, c'est la fonction : six numéros deviennent une phrase qui dit pourquoi.

> ✅ **Scie à chaîne.** Le pantalon de coupe bourre la chaîne et l'arrête : c'est la seule pièce qui fait quelque chose
> plutôt que de couvrir.

On ne réécrit pas une consigne d'institution, on la coupe (un coffre verrouillé pour l'huile à lampe d'un chalet où on
l'allume tous les soirs).

**La débrouille est le sujet, pas l'annexe.** Souder avec deux batteries d'auto en série, faire tourner un moteur avec ce
qui reste, remplacer un joint par du cuir gras, fabriquer l'outil qu'on n'a pas : la manière de faire avec rien prend
plus de place que la manière propre avec le bon matériel. La **variante d'urgence** est le cœur d'un chapitre : courte,
le chapitre n'a pas fait son travail.

## Le lecteur est un parent compétent

**Aucun conseil de sécurité domestique ordinaire** : ni rangement des produits, ni supervision, ni précaution de bon sens
parental. On ne l'adoucit pas, on le coupe. Reste seulement le fait qui **surprendrait** un parent compétent parce que
le réflexe normal est le mauvais (un enfant intoxiqué au monoxyde a l'air fatigué ou de mauvais caractère, et un parent
attentif conclut au caractère). Dans le doute, coupe.

**Le mécanisme reste, la conformité saute.** « Le monoxyde ne se voit pas et n'a pas d'odeur, et on s'endort avant
d'avoir pensé à sortir » reste, et on le répète ; « l'appareil doit être installé par un entrepreneur détenteur d'une
licence » saute. Les neuf rappels de sécurité plus bas sont des mécanismes : aucun ne saute.

## Les deux lieux

Chaque chapitre dit lequel il vise.

| | La maison | Le chalet |
| --- | --- | --- |
| Services | Hydro, aqueduc, égout | Hors réseau |
| Situation | En ville, voisins proches | Isolé |
| Réserves | La trousse de 72 h et le congélateur | La réserve de trois mois : denrées sèches, gras, sel (ch. 5) |
| Territoire | Aucun | Chasse, pêche, bois, jardin, caveau |

**La règle de bascule** décide du cadrage : ce qui est court se vit à la maison (une panne de trois jours, une tempête,
une alerte qui se lève) ; ce qui dure finit au chalet, qui a le bois, l'eau et le territoire. Un chapitre écrit pour la
maison le dit et donne l'adaptation au chalet ; un chapitre de prélèvement ou de conservation longue est au chalet. Le
chapitre 2 (Rester ou partir) porte la bascule : c'est la charnière du livre.

## Règles non négociables

1. **Ne jamais inventer un chiffre.** Un chiffre plausible non vérifié est une erreur. On cherche la source **avant**
   d'écrire, on enregistre la page dans `/sources`, on note la provenance dans `suivi/NN-redaction.md` ; ce qu'on ne
   trouve pas porte `[À VÉRIFIER]`. Le pilote donnait 71 °C pour le gibier là où la valeur est 74 : seule la vérification
   à la source l'a attrapé. **La provenance ne s'imprime pas** : aucune attribution dans le texte (ni MAPAQ, ni Santé
   Canada, ni INSPQ, ni CNESST, ni aucune autre). La discipline de recherche ne bouge pas.
2. **Les sources officielles priment** (MAPAQ, Santé Canada, ACIA, INSPQ, gouvernement du Québec) sur les blogues et les
   forums. On enregistre la page dans `/sources`, pas juste le lien.
3. **Métrique partout** (°C, g, kg, L). L'impérial entre parenthèses seulement pour les dimensions de construction.
4. **Les pourcentages de sel** se calculent sur le poids de la viande.
5. **Écrire utile** : on coupe la phrase qui n'apprend rien, le remplissage et l'introduction qui annonce la suite. Les
   mots de liaison restent (parce que, alors, donc, mais), parce qu'ils disent le lien entre deux faits (skill
   `ecriture`, P2 et P5).
6. **Le français québécois**, ton direct, dans la langue parlée correcte : « ça », « c'est pour ça que », « on a envie
   de dormir », oui ; « pis », « pu », « y'a », non. La frontière avec le joual est dans le skill `langue`. Pas de
   tutoiement du lecteur dans le corps du livre, pas de langue de bois.

## Les rappels de sécurité à répéter partout où ils s'appliquent

On les répète dans **chaque** chapitre concerné, dans l'étape qui les concerne, parce qu'on ouvre le livre à une page,
pas à la première. Ils restent la responsabilité du rédacteur.

| Règle | Où elle s'applique |
| --- | --- |
| Cuisson du gibier sauvage à **74 °C** à cœur | Ours, phoque, lièvre, orignal, castor |
| **Jamais le foie ni les reins de cervidés** (cadmium) | Abats, orignal |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | Ours, phoque |
| Tularémie : gants obligatoires à la manipulation | Lièvre |
| **Thuyone du cèdre toxique** : sapin baumier ou épinette pour la vitamine C | Scorbut, tisanes, plantes |
| Botulisme de type E : produit sa toxine dès **3 °C**, donc au frigo | Tout le poisson, surtout fumé |
| Le botulisme ne change ni l'odeur, ni le goût, ni l'apparence | Salaison, conserves, poisson |
| Viande maigre seule = mal de caribou, mortel en quelques semaines | Lièvre, orignal, rationnement |
| Génératrice : **jamais** dans un bâtiment, un garage ou sous un auvent | Stock, carburant, électricité |

## Le gabarit

Chaque chapitre technique suit `gabarit-chapitre.md` : la ligne de lieu, puis **sept sections** dans l'ordre (1 En une
ligne, 2 Quand l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle, 6 Signes d'échec, 7 Variante d'urgence),
puis les notes « En plus ». Le gabarit dit ce que porte chaque section, et combien de lignes ou de mots elle prend. On
migre les 112 chapitres à la grande passe (`suivi/plan-de-match.md`, point 21), tome 1 d'abord.

**Les dangers.** Chaque danger a son pictogramme (`{!co}`, `{!glace}`…, liste dans `plan/dangers-inventaire.md`,
section 1), expliqué une fois dans les pages des dangers au début de chaque tome. La forme de ces pages est dans la même
fiche, section 2. Dans un chapitre, le pictogramme va dans l'étape où le danger se présente (gabarit, section 4).

**Les notes « En plus »** sont de l'extra, jamais ce que le geste exige (ce qu'elles portent : gabarit, « En plus »).
La mise en pages les pose dans les trous, à la fin du texte d'une page, **jamais au travers du texte** ni entre deux
paragraphes, et une seule par page. Quand il n'y a pas de trou près de son étape, la note va dans un autre trou du
chapitre. Une page complètement blanche devient une photo de la nature (forêt boréale) en pleine page, et seulement
elle. Quand une page n'a que quelques lignes, on resserre le chapitre pour la faire disparaître.

**Les premières minutes, en orange.** Un chapitre qui a des gestes urgents (retombées, feu, monoxyde, blessure, eau
froide…) ouvre sa procédure sur la série des premières minutes, dans l'ordre où on fait les gestes, imprimée en orange
pour qu'on tombe dessus en feuilletant. On la bâtit sur ce que le chapitre dit et sur ce qu'on sait et trouve, **pas
sur le modèle d'un guide du gouvernement** : les gestes de cette famille-là, dans leur ordre réel, avec le moment de
chacun et le pourquoi. Elle suit le réel, parce que la personne qui la lit n'a rien préparé. D'abord ce qui sauve dans
les secondes et les minutes, ensuite ce qui organise. **La pastille dit le temps qu'on a** pour faire la série, à partir
de ce qui la déclenche (1 h, 15 min, 1 min). **Le logigramme est la version courte ; l'encadré orange est la version
détaillée, et tout y est**, sans limite de longueur, sans partie « … : le détail » après la série ni redite entre les
deux. **Dans chaque étape, le geste vient en premier**, puis le pourquoi, puis le détail qui sert à le faire. Ce qui
ne sert pas au geste sort de l'orange. La règle 1 tient.

**Chaque chapitre parle de son sujet, pas de celui des autres** (JP, 28 octobre 2026, sur le témoin de dégel au ch. 1 :
« ça c'est dans panne électricité qu'on devrait le savoir ; les chapitres doivent parler de ce qu'ils parlent, pas des
autres »). Un geste, une planche ou une note qui appartient à un autre chapitre y va, sans doublon ; ici, il reste un
renvoi court (« ch. 3, étape 28 »). On répète quand même les rappels de sécurité dans chaque chapitre concerné.

**Chaque planche est appelée dans le texte** (« (planche 04-40) ») là où elle sert ; elle s'imprime sur la page de son
appel ou la suivante.

## Ce qui ne s'imprime pas

- **Pas de section Sources, pas d'attribution dans le texte**, pas de crédits des images : `images/credits.md` et les
  registres restent tenus, et l'assembleur en tire une copie par tome dans `livre/credits/`, hors du livre.
- **Pas d'évidences**, dans aucune liste (« ne pas rester dans un bâtiment qui brûle »). Un chapitre qui s'en remplit
  manque de contenu réel : on écrit le contenu.
- **Pas de municipalité, pas de code légal** : aucune phrase sur un règlement municipal, une loi, un code, une norme de
  construction, un permis ou une obligation légale. Le mécanisme que la règle protège reste, dit comme un fait.
- **Aucun numéro de téléphone, aucun service qui répond** : ni 911, ni Info-Santé, ni Centre antipoison, ni ligne d'un
  ministère, ni municipalité comme service ; ni site à consulter (Info-pannes, Québec 511, carte de la SOPFEU, Urgence
  Québec), ni « joindre la santé publique », ni « signaler aux autorités », ni « le pharmacien tranche », ni « attendre
  les pompiers », même pour une panne courte à la maison. Hydro-Québec reste quand c'est un fait sur le réseau ou la
  panne. Restent : **les appareils qu'on possède pour être trouvé** (balise 406 MHz, SOS de la messagerie satellite,
  VHF) et **la préparation faite pendant que tout marche** (le rendez-vous annuel avec le pharmacien, l'analyse d'eau du
  puits). Ce que la phrase disait de la gravité reste : « ce signe veut dire que la vie est en jeu », puis ce qu'on fait
  ici, avec ce qu'on a.
- **Aucun nom latin**, nulle part dans ce qui s'imprime (JP, 28 octobre 2026) : on nomme l'espèce par son nom français
  d'usage.
- **Un livre ouvert, pas centré sur JP** : le texte ne nomme ni Baie-Comeau (seul le texte des auteurs, au dos, le
  fait), ni JP, ni l'âge de ses enfants : « la ville », « de jeunes enfants », « un enfant ». Un âge reste quand il change
  le geste (une dose par tranche d'âge, un seuil de développement, un besoin nutritionnel). La région, le climat et le
  territoire restent : c'est le terrain du livre.
- **Pas de relecture extérieure** : le livre est à JP, pour JP. Aucune mention de relecture dans le livre (ni « relecteur
  humain requis », ni « à faire confirmer par un dentiste »). Ce qu'on ne peut pas vérifier à la source porte
  `[À VÉRIFIER]`, sans nommer de relecteur, et on le lève ou on le coupe avant l'impression.

## L'écriture

Trois phrases de JP portent toutes les règles d'écriture :

- « Faut que ça soit informatif, tout le livre. » (14 et 15 octobre 2026, relecture au crayon du tome 1)
- « c'est pas juste les logigrammes, c'est la façon de dire les choses. » (15 octobre 2026)
- « le tempo du paragraphe est pas bon pi c'est vrai dans toute le livre » (28 octobre 2026)

Toute écriture ou réécriture du livre passe par le skill `ecriture` (`.claude/skills/ecriture/SKILL.md`, avec ses
exemples et ses listes de mots dans `references/`), puis par le skill `langue` pour les fautes. Le modèle de la voix
est le paragraphe « Ce qui arrive » de la page du monoxyde (`dangers/partie-1.md`), que JP a adoré le 28 octobre 2026 ;
on le garde tel quel.

**Quand deux règles tirent en sens contraire**, celle qui vient la première dans cette liste gagne :

1. la sécurité et le fait (règle 1 et rappels de sécurité) ;
2. être compris du premier coup, à voix haute ;
3. le paragraphe qu'on suit d'un trait, avec ses liens ;
4. la concision (couper ce qui n'apprend rien) ;
5. les listes de mots.

**On n'écrit pas une étape comme une explication.** L'étape numérotée, la série orange, le logigramme, le Matériel et
les tableaux sont des textes qu'on consulte. Les pages des dangers, le mécanisme dans une étape, les sections 1, 2 et 7
hors des étapes et les notes « En plus » sont des paragraphes qu'on lit d'un trait. Chaque principe du skill dit pour
lequel des deux il vaut.

**Les principes du skill**, qu'on cite par leur numéro (« skill `ecriture`, P5 ») au lieu de les recopier :

- **P1.** On le dit à voix haute, et on juge le paragraphe entier.
- **P2.** Le passage doit exister, à sa place, une seule fois.
- **P3.** Le pourquoi reste.
- **P4.** Le paragraphe suit ce qui arrive à la personne, et chaque phrase reprend la précédente.
- **P5.** On dit le lien avec un mot (parce que, alors, donc, mais).
- **P6.** Le deux-points annonce, le point-virgule lie, et on n'écrit aucun tiret.
- **P7.** Les longueurs varient avec ce qu'on dit, et la phrase finit sur ce qui compte.
- **P8.** On sait qui fait le geste, et le geste est un verbe.
- **P9.** L'étape : un geste, dans l'ordre du temps, la condition avant, le signe après.
- **P10.** Le mot qu'on dit, en français correct.
- **P11.** Le même mot pour la même chose.
- **P12.** Le fait, pas l'effet.
- **P13.** On dit le fait qui surprend comme une correction.
- **P14.** On explique une notion ou un signe la première fois qu'on en parle.

**Les règles fermes de JP**, qui restent ici :

- **Aucun tiret (— ou –)** dans une phrase ni dans un titre. Pour le remplacer, on prend d'abord le mot de lien
  (parce que, alors, mais), puis la virgule ou le point. Seules les deux lignes d'en-tête d'un chapitre
  (« # Chapitre N — Titre » et « *Tome N — Nom* ») gardent le leur, parce que l'outil de mise en pages les lit et ne
  l'imprime pas. Le deux-points sert seulement à annoncer une liste, un exemple, une autre façon, une question ou la
  fonction d'une ligne de Matériel : « **Thermomètre à sonde** : vérifie que la viande atteint 74 °C à cœur. »
- **Jamais au pronominal quand quelqu'un fait le geste** : « on doit le cuire tout de suite ou le jeter », pas « il se
  cuit ou se jette ». « Se » reste quand la chose le fait toute seule (« le puisard se remplit ») ou quand il dit ce
  qu'est la chose (« ce gaz ne se voit pas »).
- **Les mots** : jamais « village » (la maison est en ville) ; « auto », jamais « char ».
- **Un signe nommé, on l'explique en note de bas de page** (`[^1]`) : un signe, un symptôme ou un repère que le
  lecteur ne sait pas reconnaître et que le livre n'a pas décrit avant. La note dit à quoi il ressemble, et comment on
  le voit ou on le teste.
- **Les méthodes ancestrales restent, avec leur avertissement** : quand une façon de faire des Innus ou d'une autre
  nation du Nord contredit une règle du livre, on la décrit, on dit pourquoi elle marche dans leurs conditions, et un
  avertissement dit ce qui la rend dangereuse si on change ces conditions.

## Les chapitres d'ancrage, coupés

**Le chapitre principal (00) est coupé** (son texte est gardé dans `chapitres-retires/`) : ce qui doit sauter aux yeux
en urgence, on le met dans le chapitre lui-même, en orange.

**Le chapitre d'achat (00b) est coupé aussi** (JP, 28 octobre 2026 : « Le chapitre sur quoi acheter je veux pu ça, c'est
pas dans l'âme du livre » ; son texte est gardé dans `chapitres-retires/`). **Le livre n'a pas de liste d'achat** : chaque
chapitre dit ce que sa procédure demande, dans son Matériel, et le chiffre dont elle a besoin (une quantité, une
réserve), dans l'étape qui s'en sert. Aucun renvoi « au chapitre d'achat », aucun palier, aucun inventaire éparpillé.

## Les agents et la chaîne

- **On donne le cadre en morceaux** (`.claude/cadre-agents.md`). Tout agent qu'on lance sur le livre reçoit, avant son
  sujet, la partie « Pour tout agent » et celle de son rôle : « Le rédacteur », « Le vérificateur technique », « Les
  auditeurs », « L'éditeur », « Le correcteur », « Le metteur en pages » ou « Les planches et les images ». Il rend la
  liste de contrôle de sa partie, cochée. Le lecteur naïf (A2) part sans `CLAUDE.md`, sans le cadre et sans les
  règles, pour rester naïf : il reçoit seulement sa fiche et le chapitre.
- **Une correction de JP entre le jour même, à une seule place** : ses mots dans `plan/decisions-jp.md`, et la règle
  dans le fichier qu'elle touche (un skill, le gabarit, le cadre ou ce fichier), une seule fois. Les autres fichiers la
  citent par son numéro ou sa section, sans la recopier.
- **La chaîne** : rédacteur → A0 → vérificateur technique → A1, A2 et A3 en même temps → éditeur (skill `editeur`) →
  A0 → correcteur (skill `langue`) → metteur en pages → JP. Les prompts sont dans `roles.md`. Un rôle ne fait que sa
  mission. Le vérificateur technique et les auditeurs signalent, ils ne réécrivent pas, et l'éditeur est le seul à
  couper. Aucun d'eux n'a écrit la page, parce qu'un rédacteur qui se relit lui-même trouve ce qu'il a voulu écrire,
  pas ce qu'il a écrit. **Plus jamais de vérificateur sécurité.**
- **Les auditeurs.** A0, ce sont les scripts (`controle.py`, `tempo.py`, `langue.py`), qu'on passe à la fin du
  rédacteur et encore après l'éditeur. A1 (l'oreille), A2 (le lecteur naïf) et A3 (les consignes) lisent après le
  vérificateur technique, sur un texte dont les faits sont arrêtés, en même temps et sans voir le travail des autres.
  L'éditeur reçoit leurs rapports, répond à chaque cas (« fait », ou « non » et pourquoi) et réécrit une seule fois ;
  le vérificateur technique relit ensuite seulement ce qui a changé de sens. Les fiches des auditeurs sont dans
  `.claude/skills/ecriture/references/auditeurs.md`.
- **Aucune faute de français dans ce qui s'imprime** (JP, 27 octobre 2026, la dédicace de l'épreuve du tome 1 :
  « quelqu'un qui sait » pour « qui sache » ; « Faut pu jamais que ça arrive une faute de même »). Tout texte qui
  s'imprime (chapitre, légende, logigramme, note, page de titre, dédicace, sommaire, couverture, texte des auteurs)
  passe par le skill `langue` (`.claude/skills/langue/SKILL.md`) avant le montage ; le rapport de l'assembleur (section
  Langue) et `langue.py --assembleur` sont à 0 avis avant toute épreuve.
- **Le regard qualité, c'est JP** : on lui montre l'image ou la page dès qu'elle est faite. Pour les planches et les
  images, il n'y a pas de tour de relecture d'agents de plus ; pour le texte, les auditeurs font ce tour, une seule
  fois, avant l'éditeur.
- **Économiser les jetons** (JP, 20 octobre 2026). Une session par tâche : quand une tâche est finie et poussée, la
  suivante part dans une session neuve. Un agent ou un workflow seulement quand la tâche ne tient pas dans la
  conversation, et alors un agent par petite tâche (un chapitre, une planche, un lot précis). On donne le coût à JP avant
  un gros travail.

## Les images

On ne copie rien du web sans vérifier la licence. Sources acceptables : Wikimedia Commons, iNaturalist, Flickr, planches
du domaine public d'avant 1930, agences fédérales américaines, figures de revues scientifiques sous CC BY, et les photos
de JP. Les licences non commerciales sont correctes pour un usage privé, à remplacer si le livre se vend un jour. Chaque
image entre dans `images/credits.md` avec son auteur, sa licence et son lien. **Pour les photos, la beauté d'abord** : on
cherche dans les meilleures (les « Featured pictures » et « Quality images » de Commons, les photographes de Flickr) ;
une photo ordinaire ne passe pas parce qu'elle est libre.

## Le dossier

`chapitres/` (un fichier par chapitre, `NN-titre-court.md`), `suivi/` (`suivi-chapitres.md`, `plan-de-match.md`, une
fiche par chapitre), `sources/` (les pages officielles enregistrées, pas des liens), `images/` (planches, photos,
`credits.md`), `plan/` (plan maître, glossaire, dangers), `design/` (mise en pages et outils), `livre/` (les tomes
assemblés).
