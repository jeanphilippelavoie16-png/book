# Le Manuel du Nord — instructions du projet

Ce fichier est lu au début de chaque session. Il prime sur tout le reste. Il ne garde que les règles : d'où vient
chacune, avec les mots de JP, les dates et les exemples, est dans `plan/decisions-jp.md` (pas chargé à chaque session).

## Ce qu'on fait

Un ouvrage de référence en **6 tomes, 112 chapitres**, sur la conservation des aliments, la subsistance et l'autonomie,
adapté à la Côte-Nord (forêt boréale, hivers à -35 °C, saison de jardin de 90 à 100 jours, orignal, truite, fleuve salé).

- Tome 1 — Tenir (ch. 1 à 18 ; le 00 et le 00b sont coupés)
- Tome 2 — Le corps (ch. 19 à 40)
- Tome 3 — Prélever (ch. 41 à 60)
- Tome 4 — De la bête au garde-manger (ch. 61 à 81)
- Tome 5 — La forêt, le jardin et le chalet (ch. 82 à 101)
- Tome 6 — L'atelier (ch. 102 à 112)

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

Une consigne d'institution ne se réécrit pas, elle se coupe (un coffre verrouillé pour l'huile à lampe d'un chalet où
on l'allume tous les soirs).

**La débrouille est le sujet, pas l'annexe.** Souder avec deux batteries d'auto en série, faire tourner un moteur avec ce
qui reste, remplacer un joint par du cuir gras, fabriquer l'outil qu'on n'a pas : la manière de faire avec rien prend
plus de place que la manière propre avec le bon matériel. La **variante d'urgence** est le cœur d'un chapitre : courte,
le chapitre n'a pas fait son travail.

## Le lecteur est un parent compétent

**Aucun conseil de sécurité domestique ordinaire** : ni rangement des produits, ni supervision, ni précaution de bon sens
parental. Ça ne s'adoucit pas, ça se coupe. Reste seulement le fait qui **surprendrait** un parent compétent parce que
le réflexe normal est le mauvais (un enfant intoxiqué au monoxyde a l'air fatigué ou de mauvais caractère, et un parent
attentif conclut au caractère). Dans le doute, coupe.

**Le mécanisme reste, la conformité saute.** « Le monoxyde de carbone n'a ni odeur ni couleur, tu t'endors au lieu de
sortir » reste, et se répète ; « l'appareil doit être installé par un entrepreneur détenteur d'une licence » saute. Les
neuf rappels de sécurité plus bas sont des mécanismes : aucun ne saute.

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
5. **Écrire dense** : une phrase qui n'apprend rien saute ; pas de remplissage, pas d'introduction qui annonce la suite.
6. **Le français québécois**, ton direct. Pas de tutoiement du lecteur dans le corps du livre, pas de langue de bois.

## Les rappels de sécurité à répéter partout où ils s'appliquent

Ils se répètent dans **chaque** chapitre concerné, dans l'étape qui les concerne : on ouvre le livre à une page, pas à
la première. Ils restent la responsabilité du rédacteur.

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

Chaque chapitre technique suit `gabarit-chapitre.md`, en **sept sections**, dans l'ordre : 1 En une ligne, 2 Quand
l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle, 6 Signes d'échec, 7 Variante d'urgence. « Comment ça marche »
et la section Danger sont coupés. Un mécanisme qui apprend quelque chose va dans l'étape qu'il explique. Chaque danger a
son pictogramme (`{!co}`, `{!glace}`…, liste dans `plan/dangers-inventaire.md`), expliqué une fois à fond dans les pages
des dangers au début de chaque tome ; dans un chapitre, il s'affiche dans l'étape où le danger se présente, et ce qui est
propre au chapitre (la distance, l'épaisseur, la durée) se dit dans cette étape. La migration des 112 chapitres se fait
à la grande passe (`suivi/plan-de-match.md`, point 21), tome 1 d'abord. Un chapitre de référence (listes, tableaux) peut
remplacer la procédure numérotée par des tableaux, mais garde l'ordre général.

- **« Quand l'utiliser », c'est juste quand l'utiliser** : pas de liste « c'est la mauvaise procédure quand », pas de
  contre-exemple évident.
- **Le Matériel** ne liste que l'indispensable de **cette** procédure (sans quoi elle échoue ou devient dangereuse), une
  ligne par item, 15 à 20 mots. Rien d'autre.
- **« En plus »**, après la section 7, non numérotée : des encadrés vert pâle (la façon des Innus, une photo pour
  reconnaître, un petit dessin), de l'extra, jamais ce que le geste exige. La mise en pages les pose dans les trous, à la
  fin du texte d'une page, **jamais au travers du texte** ni entre deux paragraphes ; une seule par page ; faute de trou
  près de son étape, dans un autre trou du chapitre. Une page complètement blanche devient une photo de la nature (forêt
  boréale) en pleine page, et seulement elle ; une page qui n'a que quelques lignes se résorbe en resserrant le chapitre.

**Les premières minutes, en orange.** Un chapitre qui a des gestes urgents (retombées, feu, monoxyde, blessure, eau
froide…) ouvre sa procédure sur la série des premières minutes, dans l'ordre où on les fait, imprimée en orange pour
qu'on tombe dessus en feuilletant. Elle se bâtit sur ce que le chapitre dit et sur ce qu'on sait et trouve, **pas sur le
modèle d'un guide du gouvernement** : les gestes de cette famille-là, dans leur ordre réel, avec le moment de chacun et
le pourquoi. Elle suit le réel : celui qui la lit n'a rien préparé ; d'abord ce qui sauve dans les secondes et les
minutes, ensuite ce qui organise. **La pastille dit le temps qu'on a** pour faire la série, à partir de ce qui la
déclenche (1 h, 15 min, 1 min). **Le logigramme est la version courte ; l'encadré orange est la version détaillée, et
tout y est** : chaque étape porte son geste, son pourquoi et le détail qui sert à le faire, sans limite de longueur, sans
partie « … : le détail » après la série ni redite entre les deux. La règle 1 tient.

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
- **Un livre ouvert, pas centré sur JP** : le texte ne nomme ni Baie-Comeau (seul le texte des auteurs, au dos, le
  fait), ni JP, ni l'âge de ses enfants : « la ville », « de jeunes enfants », « un enfant ». Un âge reste quand il change
  le geste (une dose par tranche d'âge, un seuil de développement, un besoin nutritionnel). La région, le climat et le
  territoire restent : c'est le terrain du livre.
- **Pas de relecture extérieure** : le livre est à JP, pour JP. Aucune mention de relecture dans le livre (ni « relecteur
  humain requis », ni « à faire confirmer par un dentiste »). Ce qui ne se vérifie pas à la source porte `[À VÉRIFIER]`,
  sans nommer de relecteur, et se lève ou se coupe avant l'impression.

## L'écriture

Toute écriture ou réécriture du livre passe par le skill `ecriture` (`.claude/skills/ecriture/SKILL.md`), puis par le
skill `langue` pour les fautes (`.claude/skills/langue/SKILL.md`, le français écrit correct). Le skill `ecriture` porte
la méthode, les exemples et le script de contrôle. L'essentiel :

- **On écrit comme on l'expliquerait à quelqu'un, à voix haute.** Chaque phrase a un verbe qui dit le geste, on sait qui
  le fait, les mots sont ceux de tous les jours avec leurs articles, le but est dit quand il n'est pas évident. Pas de
  liste de noms à la place des actions, pas d'étiquette en raccourci (« Refus, il a où aller »), même dans un
  logigramme. Couper un mot qui n'apprend rien, oui ; couper ce qui fait une phrase française, non. Le test : lue à
  voix haute à quelqu'un qui n'a pas lu le chapitre, la phrase se comprend du premier coup.
- **Informatif partout, jusqu'au mot (pas de « fils d'la AI »).** Saute : la phrase qui parle du livre ou de la page ; la
  statistique d'ambiance (un chiffre reste s'il change ce qu'on fait) ; la justification du cadrage ; la justification
  que le lecteur connaît déjà ; la conséquence évidente d'un fait qu'on vient de dire ; la répétition (un fait se dit
  une fois par chapitre, là où il sert, ailleurs un renvoi court) ; ce qui ne marche pas, quand on peut dire ce qui
  marche ; l'avertissement redit ailleurs que là où il sert ; la chute en formule ; l'opposition fabriquée ; l'image
  poétique, la petite scène, la personnification ; le complément qui décore, l'adjectif qui redit le nom, « déjà »,
  « encore », « tout ». Le test : sans la phrase ou le mot, le lecteur sait-il moins quoi faire ?
- **La tournure naturelle.** Le sujet se nomme (« les gens qui », « la personne qui », pas « ceux qui » en tête de
  phrase) ; l'ordre est naturel (le verbe, ce qu'on fait, puis où : « laisser ses chaussures à la porte ») ; une consigne
  se dit comme une consigne (« doivent », « on doit », « il faut », l'infinitif dans une étape), pas au présent qui
  décrit. **Jamais au pronominal** quand quelqu'un fait le geste (« on doit le cuire tout de suite ou le jeter », pas
  « il se cuit ou se jette ») ; « se » reste quand la chose le fait toute seule (« le puisard se remplit »).
- **Pas de tiret (— ou –) dans une phrase** : virgule, deux-points, parenthèses ou point. Les lignes de matériel aussi :
  « **Thermomètre à sonde** : porte les 74 °C à cœur. »
- **Les mots** : jamais « village » (la maison est en ville) ; « auto », jamais « char ».
- **Un signe nommé s'explique** : un signe, un symptôme ou un repère que le lecteur ne sait pas reconnaître, et que le
  livre n'a pas décrit avant, s'explique en note de bas de page (`[^1]`) : à quoi ça ressemble, comment on le voit ou le
  teste.
- **Les méthodes ancestrales restent, avec leur avertissement** : quand une façon de faire des Innus ou d'une autre
  nation du Nord contredit une règle du livre, on la décrit, on dit pourquoi elle marche dans leurs conditions, et un
  avertissement dit ce qui la rend dangereuse si on change ces conditions.

## Les chapitres d'ancrage, coupés

**Le chapitre principal (00) est coupé** (son texte est gardé dans `chapitres-retires/`) : ce qui doit sauter aux yeux
en urgence se met dans le chapitre lui-même, en orange.

**Le chapitre d'achat (00b) est coupé aussi** (JP, 28 octobre 2026 : « Le chapitre sur quoi acheter je veux pu ça, c'est
pas dans l'âme du livre » ; son texte est gardé dans `chapitres-retires/`). **Le livre n'a pas de liste d'achat** : chaque
chapitre dit ce que sa procédure demande, dans son Matériel, et le chiffre dont elle a besoin (une quantité, une
réserve), dans l'étape qui s'en sert. Aucun renvoi « au chapitre d'achat », aucun palier, aucun inventaire éparpillé.

## Les agents et la chaîne

- **Tout agent qu'on lance sur le livre reçoit `.claude/cadre-agents.md` au complet**, avant son sujet, et rend la liste
  de contrôle de sa partie cochée. **Toute correction de JP entre le jour même** dans le skill concerné et dans ce cadre.
- **La chaîne** : rédacteur → vérificateur technique → éditeur → correcteur → metteur en pages (prompts dans
  `roles.md`). Un rôle ne fait que sa mission ; le vérificateur technique signale, il ne réécrit pas. Un rédacteur qui
  se relit lui-même trouve ce qu'il a voulu écrire, pas ce qu'il a écrit. **Plus jamais de vérificateur sécurité.**
- **Aucune faute de français dans ce qui s'imprime** (JP, 27 octobre 2026, la dédicace de l'épreuve du tome 1 :
  « quelqu'un qui sait » pour « qui sache » ; « Faut pu jamais que ça arrive une faute de même »). Tout texte qui
  s'imprime (chapitre, légende, logigramme, note, page de titre, dédicace, sommaire, couverture, texte des auteurs)
  passe par le skill `langue` (`.claude/skills/langue/SKILL.md`) avant le montage ; le rapport de l'assembleur (section
  Langue) et `langue.py --assembleur` sont à 0 avis avant toute épreuve.
- **Le regard qualité, c'est JP** : on lui montre l'image ou la page dès qu'elle est faite, sans tour de relecture
  d'agents de plus.
- **Économiser les jetons** (JP, 20 octobre 2026). Une session par tâche : quand une tâche est finie et poussée, la
  suivante part dans une session neuve. Un agent ou un workflow seulement quand la tâche ne tient pas dans la
  conversation, et alors un agent par petite tâche (un chapitre, une planche, un lot précis). On donne le coût à JP avant
  un gros travail.

## Les images

Rien ne se copie du web sans vérifier la licence. Sources acceptables : Wikimedia Commons, iNaturalist, Flickr, planches
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
