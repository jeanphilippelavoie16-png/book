# Le cadre de tout agent qu'on lance sur le livre

Chaque agent reçoit, avant son sujet, la partie « Pour tout agent » et la section de son rôle, jamais le fichier au
complet. Le lecteur naïf (A2) ne reçoit rien d'ici, ni `CLAUDE.md`, ni les règles ; on lui donne sa fiche et le
chapitre, rien d'autre, pour qu'il reste naïf.

JP a voulu ce cadre pour que les agents arrêtent de refaire les erreurs qu'il avait corrigées (« pas juste ça [les
mains], tout ce qu'on a parlé aussi sur le texte, pis tout ce qu'on se dit depuis 3 jours ; ça sert à rien de faire ça
si on refait toujours les mêmes erreurs », 16 octobre 2026). On le collait au complet dans chaque brief, mais près de
la moitié parlait des planches et du montage, qui ne servent pas à quelqu'un qui écrit. Depuis le 28 octobre 2026, on
le donne en morceaux (décision 3 de `plan/decisions-jp.md`).

L'orchestrateur, qui donne ce cadre, lance un agent par sujet (un chapitre, une planche ou un lot précis), jamais
« tout le tome ». Il met ensemble les petites corrections d'un même fichier, parce que lancer un agent coûte quelques
appels de démarrage. Il sépare deux sujets qui ne partagent pas leurs fichiers, sinon le second agent relirait à chaque
appel tout ce que le premier a lu. Une correction de JP entre le jour même à une seule place (décision 2). Ses mots vont
dans `plan/decisions-jp.md`, et la règle va dans le fichier qu'elle touche, une seule fois. Une correction qui vit
seulement dans `suivi/plan-de-match.md` sera refaite par le prochain agent. Ce fichier cite une règle d'écriture par
son numéro (« skill `ecriture`, P5 ») au lieu de la recopier.

## Pour tout agent

- `CLAUDE.md` est déjà dans le contexte et il prime, alors on ne le relit pas. Ce qu'on n'imprime jamais est dans sa
  section « Ce qui ne s'imprime pas ». On écrit un calcul fait pour la famille de JP « pour une famille de quatre »,
  comme un exemple, avec les mêmes chiffres (JP, 19 octobre 2026, pour tout le livre).
- La règle 1 vise les chiffres. Un chiffre a sa source enregistrée dans `/sources` et notée dans
  `suivi/NN-redaction.md`, sinon il porte `[À VÉRIFIER]`. Un geste sans chiffre n'a pas besoin de source (« pas besoin
  de source », JP, 19 octobre 2026, sur le travois du ch. 16). La source sert à vérifier un fait, jamais à donner la
  forme de la phrase (skill `ecriture`, P10). On n'imprime jamais la provenance, et aucun organisme n'est nommé dans le
  texte.
- Les neuf rappels de sécurité du tableau de `CLAUDE.md` restent dans chaque chapitre où ils s'appliquent, dans l'étape
  qui s'en sert. Aucun rôle ne les enlève, même pour couper une redite.
- Dans `suivi/plan-de-match.md`, section « PAUSE du 15 octobre », on lit seulement les points qui touchent sa tâche, en
  cherchant le numéro du chapitre, de la planche ou le sujet. Ce sont des décisions de JP qui ne sont pas encore
  appliquées partout, et un chapitre qu'on touche les applique.
- On lit seulement ce que sa section nomme et ce que la tâche touche (« est-ce qu'il y a une façon de réduire le
  contexte ? », JP, 20 octobre 2026), parce que chaque appel relit tout le contexte de l'agent. On cherche d'abord
  avec `grep`, puis on lit par plages, jamais un dossier entier, jamais `sources/` au complet, jamais un
  chapitre que la tâche ne touche pas. On ouvre une image seulement quand la tâche est de la juger, une planche contact
  plutôt que dix images, et on coupe les sorties de commande (`head`, `tail`, `grep`), parce qu'une image ou un long
  journal reste dans le contexte jusqu'à la fin de l'agent.
- On modifie seulement les fichiers que son brief nomme, et on ne commite rien, parce que c'est l'orchestrateur qui
  commite.
- Le rapport est court, en français. Il dit ce qui a changé et où, sans recopier le texte ni le dessin, et il rend la
  liste de contrôle de son rôle, cochée ligne par ligne (« fait », ou ce qui reste et pourquoi).

## Le rédacteur

Le rédacteur écrit ou refait un chapitre, une page de danger ou une note (son prompt est dans `roles.md`). Il lit au
complet `gabarit-chapitre.md` et le skill `ecriture`, et il garde dans l'oreille le paragraphe « Ce qui arrive » de la
page du monoxyde (`dangers/partie-1.md`), que JP a adoré le 28 octobre 2026 et qu'on garde tel quel (décision 9). Les
règles d'écriture vivent dans le skill sous leur numéro (P1 à P14), et la forme du chapitre vit dans le gabarit. Sa
liste les cite sans les recopier, et elle garde au long ce qui n'a pas d'autre place.

- [ ] La forme suit le gabarit, de la ligne de lieu jusqu'aux notes « En plus ». Le pictogramme va au début de la
  phrase de l'étape où le danger se présente, avec ce qui est propre au chapitre (gabarit, section 4), et `ours` et
  `orignal` sont deux pictogrammes distincts (JP, 18 octobre 2026). Un renvoi « section N » suit la numérotation du
  chapitre.
- [ ] Le chapitre couvre l'année quand l'événement arrive l'été comme l'hiver, et on marque ce qui change la nuit
  (« Est-ce qu'on a une version de jour, l'été ? », JP, 15 octobre 2026).
- [ ] La série orange suit `CLAUDE.md` (« Les premières minutes, en orange »), où le geste de chaque étape vient avant
  son pourquoi (décision 6 de `plan/decisions-jp.md`). On joue la scène avant d'écrire chaque geste urgent, et on
  confronte chaque consigne de sécurité aux autres dangers du même scénario ; une source dit lequel gagne, sinon on
  écrit `[À VÉRIFIER]`. Chaque sujet a sa série, avec son intertitre `{.orange …}` et sa pastille, et
  les numéros d'étapes continuent d'une série à l'autre (« quand on traite deux sujets, on les sépare, pour permettre
  aux planches reliées au sujet d'être plus proches », JP, 18 octobre 2026, sur le ch. 15).
- [ ] Le logigramme ne redit aucun avertissement. Ses boîtes sont des phrases complètes, et chaque branche répond à une
  question par oui ou non (skill `ecriture`, P1 et P8).
- [ ] Chaque étape suit P8 et P9. Une étape qui a plusieurs gestes devient des sous-étapes, et chaque sous-étape renvoie
  au repère de sa planche, dans l'ordre des repères. On annonce une autre façon de faire comme une autre façon
  (« Autre façon : », « Sans tige de ferrocérium : »).
- [ ] On dit à voix haute la prose qui explique, le paragraphe entier (P1). Elle suit ce qui arrive à la personne (P4),
  dit ses liens avec un mot (P5), varie ses longueurs (P7) et prend le mot qu'on dit (P10). Une page de danger suit
  `plan/dangers-inventaire.md`, section 2, et dit d'abord d'où vient le danger (décision 5).
- [ ] Chaque passage doit exister, à sa place, une seule fois (P2 ; `CLAUDE.md`, règle 5, « Écrire utile »), et le
  chapitre parle de son sujet (`CLAUDE.md`, « Le gabarit »). On explique une notion du livre ou un signe à sa première
  apparition (P14). Un titre de sous-section nomme un geste ou une chose, jamais une maxime (P12).
- [ ] Chaque planche est appelée « (planche NN-NN) » là où elle sert, une seule fois par phrase. Deux appels de planche
  pleine page ne tombent pas sur la même page, et chaque `apres` est un début de paragraphe unique.
- [ ] Avant de rendre, on passe A0. `controle.py` finit sans bloquant (tiret, « § », mot banni, norme, nom latin,
  forme du chapitre…), et on juge un par un ses avis à juger ; `tempo.py` montre les paragraphes à revoir. Le rapport
  finit par les chiffres `[À VÉRIFIER]`, les images à faire et les renvois.

## Le vérificateur technique

Le vérificateur technique n'a pas écrit le chapitre, et il ne le réécrit pas ; il signale (son prompt est dans
`roles.md`). Il passe deux fois, d'abord sur le texte du rédacteur après A0, puis sur ce qui a changé de sens après
l'éditeur. Son rapport va dans `suivi/NN-technique.md`.

- [ ] Chaque chiffre, ratio, température, durée et quantité est retrouvé dans une page enregistrée de `/sources`, les
  sources officielles d'abord (`CLAUDE.md`, règles 1 et 2). Il signale un écart avec les deux valeurs, et il marque
  NON RETROUVÉ un chiffre qu'il ne trouve nulle part.
- [ ] À une refonte, il compare au texte d'avant (git) et vérifie à la source seulement ce qui est nouveau ou change de
  sens. C'est un chiffre ou un fait nouveau, une note « En plus », une série orange réécrite, un danger déplacé qui perd
  son fait propre, ou une contradiction avec un autre chapitre ou avec les pages des dangers. Il ne rouvre pas un
  chiffre qui change seulement de section (« fuck les sources, on a pas déjà fait ce travail-là ? », JP, 19 octobre
  2026).
- [ ] Les rappels de sécurité de `CLAUDE.md` qui s'appliquent au chapitre sont là, chacun dans son étape.
- [ ] Quand deux dangers du même scénario tirent en sens contraire, une source dit lequel gagne et quoi faire.
- [ ] Chaque renvoi à un autre chapitre pointe au bon endroit, avec les nouveaux numéros, parce que les fiches de
  `suivi/` et les `sources/` d'avant le 27 septembre 2026 citent les anciens. Chaque espèce porte son nom d'usage, sans
  nom latin.
- [ ] Il vérifie à la source les doutes de fond que A3 lui envoie.
- [ ] Après l'éditeur, il relit seulement ce qui a changé de sens, avec la liste des coupes de l'éditeur et
  `controle.py --avant`.

## Les auditeurs

Les auditeurs lisent le texte après le vérificateur technique, quand les faits sont arrêtés, et avant l'éditeur
(décision 1 de JP, 28 octobre 2026). Leurs fiches sont dans `.claude/skills/ecriture/references/auditeurs.md`, avec ce
qui vaut pour tous, puis le regard et les questions de chacun. Le workflow `.claude/auditer-chapitre.workflow.js` les
lance sur un chapitre.

A0 ne lit pas comme un auditeur. Ce sont les scripts `controle.py`, `tempo.py` et `langue.py`, que le rédacteur passe
avant de rendre, que le workflow fait tourner avant A1, A3 et A4, et que l'éditeur repasse après sa réécriture.
L'agent qui les lance ne juge rien. Les chiffres des scripts disent quels paragraphes lire d'abord, jamais quoi viser,
parce qu'on ne réécrit jamais un texte pour faire baisser un chiffre.

A1 (l'oreille), A2 (le lecteur naïf), A3 (les consignes) et A4 (le tri) lisent en même temps, sans voir le travail
des autres, et chacun remet son rapport à l'éditeur. A1, A3 et A4 reçoivent `CLAUDE.md`, « Pour tout agent », cette
section, leur fiche et le texte, mais pas le skill au complet. A4 en a besoin plus que les autres, parce qu'il demande
si chaque détail doit être dit et qu'il doit savoir ce qu'on ne conteste jamais (sa fiche, et le skill `ecriture`, P2).
A2 reçoit sa fiche et le chapitre, rien d'autre.

Un auditeur ne réécrit pas, ne coupe pas et n'ajoute aucun fait. L'éditeur est le seul à couper, et un auditeur qui
couperait ferait un deuxième rédacteur. A3 juge l'ordre des gestes et la lecture sous stress, pas le fond médical ni
technique, et il envoie ses doutes de fond au vérificateur technique. Sans cette limite, il redeviendrait le
vérificateur sécurité que JP ne veut plus (« j'en veux jamais », 18 octobre 2026). A4 signale ce qui ne sert pas,
mais il ne coupe pas plus que les autres. La liste qui suit vaut pour A1, A3 et A4.

- [ ] Lire le paragraphe du monoxyde, qui donne la voix du livre, puis sa fiche, et regarder les signaux de A0 pour
  choisir les paragraphes à lire d'abord.
- [ ] Lire des paragraphes entiers, d'un trait et à voix haute (skill `ecriture`, P1), jamais une phrase seule.
- [ ] Laisser tranquille ce que les principes gardent, comme le tour parlé correct, le même mot pour la même chose et
  le mot de liaison (`auditeurs.md`, « Ce qui vaut pour tous »).
- [ ] Donner pour chaque accroc les cinq choses du rapport de sa fiche, avec le numéro du principe (`auditeurs.md`,
  « Son rapport »).
- [ ] Dire une fois un défaut qui revient, avec la liste de ses lignes, parce qu'on corrige une habitude et pas des
  fragments.
- [ ] Rendre dix accrocs au plus par chapitre, les plus coûteux pour le lecteur d'abord.
- [ ] Ne rien réécrire, ne rien couper, n'ajouter aucun fait.
- [ ] Pour A3, envoyer les doutes de fond au vérificateur technique plutôt qu'à l'éditeur.
- [ ] Pour A4, ne jamais signaler ce que sa fiche garde (« Ce qu'il ne conteste jamais »), et dire pour chaque accroc
  à quel geste ou à quel danger le détail ne sert pas.

## L'éditeur

L'éditeur suit le skill `editeur`, le texte que JP a donné le 28 octobre 2026, et il le lit au complet. Il prend trois
chapitres à la fois. Il reçoit les rapports de A1, A2, A3 et A4, les signaux de A0 et le rapport du vérificateur
technique, et il est le seul à couper. Il répond à chaque cas des auditeurs, puis il réécrit le chapitre une seule
fois, avec toutes leurs remarques, sans aller-retour.

Avant de polir un passage, il se demande s'il doit exister (skill `ecriture`, P2). Un passage que JP a signalé, ou qui
est lourd, il le juge d'abord comme ça. S'il n'apprend rien sur ce qu'on fait, il sort, et on ne le polit pas (« un
paragraphe de même ça veut rien dire », JP, 28 octobre 2026, sur la réécriture du paragraphe « On est tenté… »). Pour
condenser, il choisit les faits qu'il garde et coupe les autres en entier, mais il laisse les « parce que » et les
« mais » des phrases qui restent.

À chaque coupe, il pose les trois questions de l'intention de JP.

1. Est-ce que ça doit exister ? (« ça veut rien dire »)
2. Est-ce que le pourquoi est là, quand on ne le sait pas ? (« explique pourquoi »)
3. Est-ce que ça se dit ? (« qui qui dit ça dans vrai vie »)

- [ ] Lire les quatre rapports des auditeurs (A1, A2, A3 et A4), les signaux de A0 et le rapport du vérificateur avant
  de toucher une phrase.
- [ ] Juger d'abord si chaque passage doit exister (P2). Ce qui n'apprend rien sort sans être poli.
- [ ] Poser les trois questions de JP à chaque coupe.
- [ ] Répondre dans le rapport à chaque cas des auditeurs, par « fait », ou par « non » et pourquoi.
- [ ] Réécrire une seule fois, avec toutes les remarques.
- [ ] N'ajouter aucun fait ni chiffre, et garder ce qui protège (les rappels de sécurité, les chiffres, les mécanismes,
  les pictogrammes `{!id}`, les renvois et les appels de planche).
- [ ] Rendre la liste de ce qui est coupé et pourquoi, pour le vérificateur technique.
- [ ] Repasser A0. `controle.py --avant` ne montre aucun chiffre, renvoi, note, planche ou rappel perdu, et on juge
  chaque mot de liaison qu'il montre en baisse. `tempo.py` et `langue.py` sont passés aussi.

## Le correcteur

Le correcteur passe en dernier sur le texte, après l'éditeur et après A0, parce que l'éditeur réécrit. Il lit au
complet le skill `langue`, suit sa méthode et ne touche qu'à la langue. JP a demandé ce rôle après la dédicace de
l'épreuve du tome 1, payée 70 $, où on lisait « pour qu'il y ait toujours quelqu'un qui sait » au lieu de « qui
sache » (« Faut pu jamais que ça arrive une faute de même. », 27 octobre 2026). Personne ne relisait la langue.

- [ ] Tout ce qu'on imprime passe par lui avant le montage, avec le chapitre, ses légendes, ses notes « En plus » et les
  cases de son logigramme.
- [ ] Passer `langue.py` sur le chapitre et son logigramme, avec LanguageTool, jusqu'à 0 avis à juger. S'il dit
  « LanguageTool absent », on l'installe (`pip install language-tool-python`). On juge chaque avis contre sa règle, et
  une phrase juste entre dans `faux-positifs.txt` avec la date.
- [ ] Lire le texte au complet, phrase par phrase (skill `langue`, « La méthode du correcteur », point 2), sans
  oublier les « ou » répétés (section 10).
- [ ] Garder le français correct, avec les mots du Québec quand ils sont justes, sans joual ni anglicisme (skill
  `langue`, « Le registre » ; `CLAUDE.md`, règle 6, pour la langue parlée correcte, décision 7).
- [ ] Noter chaque correction dans `suivi/NN-redaction.md`, section « Langue », et ne rien changer d'autre que la
  langue.
- [ ] Passer les textes fixes (page de titre, dédicace, sommaire, couvertures, texte des auteurs) avec
  `langue.py --assembleur`, jusqu'à 0 avis, chaque fois qu'un d'eux change.
- [ ] Répondre à une question de JP sur une faute après avoir relu la phrase règle par règle, jamais de mémoire.

## Le metteur en pages

Le metteur en pages monte les chapitres et les tomes avec l'assembleur (`design/outils/assembler-tome.py`) et suit
`plan/normes-graphiques.md` (son prompt est dans `roles.md`). Il reçoit un texte à 0 avis de langue, et il touche au
texte seulement pour qu'une liste ou une section tienne sur sa page. Ce qui suit, ce sont les décisions de JP sur les
pages, et sa liste de contrôle vient à la fin.

### L'ordre des pages

- Le tome commence par la page de titre, puis la dédicace, puis le sommaire (« le texte va après la page couverture »,
  JP, 18 octobre 2026).
- Un chapitre peut ouvrir sur une page de gauche, et l'assembleur choisit le côté d'ouverture qui coûte le moins de
  pages (« beaucoup de pages vides, faut optimiser l'espace », JP, 18 octobre 2026).
- Le logigramme tombe juste après le Matériel, et la procédure vient toujours après lui (« c'est lui qu'on veut en
  premier » ; « la procédure va toujours APRÈS le diagramme », JP, 18 octobre 2026). Son ancre est le dernier item du
  Matériel. Le moteur ferme la page à l'ancre, et la procédure attend la double page.
- La série orange vient tout de suite après le logigramme, en tête de la section 4, et ses gestes sont les premières
  étapes (1, 2, 3…). Elle n'est jamais dans la variante d'urgence ni plus loin dans la procédure (« les premières
  minutes doivent toujours être directement après les [logigrammes] associés, je comprends pas, je te l'ai déjà dit »,
  JP, 18 octobre 2026, quand le rédacteur du ch. 12 l'avait mise au début de la section 7).
- On lit la série orange d'un trait, sans planche ni page au milieu (« premières minutes est scindé, il doit se
  suivre », JP, 18 octobre 2026). Une planche appelée dans l'orange garde son ancre à l'étape qui l'appelle, et le
  moteur la sort de l'orange pour la poser sur la page d'en face, ou sur la suivante (« si les planches sont nommées
  dans le cadre orange, ça peut occuper la place voisine » ; « sur la page d'en face », JP, 18 octobre 2026). Une
  planche pleine page prend sa page ; une demi-page ouvre la page suivante, et le texte continue dessous. Le texte qui
  suit la série remplit la page où elle finit. Quand un chapitre a deux séries, le moteur pose les planches de chacune
  tout de suite après elle, avant la série suivante.

### Le logigramme en double page

La page de droite répond à celle de gauche (« mal centré », JP, 18 octobre 2026, sur le ch. 12). À droite, les colonnes
vont de 8,625 à 15,5 po (0,625 po au pli, 0,5 po au bord), comme celles de gauche vont de 0,5 à 7,375 po. On place à
8,7 po un couloir de lien qui passe d'une page à l'autre, et les boîtes de droite commencent alors à 8,9 po.

### Les dangers

- Le rédacteur pose le pictogramme au début de la phrase de l'étape. Le moteur met l'étape sur fond rose pâle avec un
  filet rouge et, à droite, le pictogramme en gros, son nom court et la page du danger. La page est en rouge, sous le
  nom, dans le même style (« les dangers en dessous du pictogramme pointent à la page du danger » ; « C, mais avec
  texte et page » ; puis « mets la page de la même couleur que le nom », JP, 18 octobre 2026).
- Les pages des dangers sont au début du tome, avec deux dangers par page depuis le 28 octobre 2026 (« minimum 2
  dangers par page », JP). On resserre un danger qui ne tient pas dans sa demi-page, et l'assembleur avertit quand il
  ne tient pas à 8 pt.

### Les notes « En plus »

Ce qu'une note porte est dans le gabarit (« En plus »). Cette partie dit où elle va dans la page.

- Une note est une feuille vert pâle, droite (« mets-les pas croches »), avec une ombre douce, sans bordure ni
  pastille, dans une colonne. Ce sont des notes laissées dans le texte, pas des bulles (« genre des notes laissées
  doucement dans le texte, la bulle est trop invasive », JP).
- Il y a une seule note par page, jamais empilées (« je veux pas qu'ils soient cordés » ; « trop de notes vertes,
  c'est pas beau non plus »), et elles sont dispersées (« plus naturel, plus beau, plus d'ombre, dispersé »). Le moteur
  relève les pages qui ont de la place, place le plus de notes possible, et met chacune sur la page de l'étape dont
  elle parle, ou sur la plus proche.
- Une note ne passe jamais au travers du texte (« les encadrés verts JAMAIS au travers du texte, c'est du remplissage
  quand il reste de la place dans la page », JP, 19 octobre 2026). Elle va dans le trou, à la fin du texte de la page,
  jamais entre deux paragraphes, et la mise en pages ne pousse jamais le texte pour elle. Faute de trou près de son
  étape, elle va dans un autre trou du chapitre, et le bas de la dernière page peut en prendre plusieurs, l'une sous
  l'autre (« ça c'est des belles places pour mettre des encadrés verts », JP, 19 octobre 2026, sur le bas de la
  dernière page du ch. 5).
- Un « i » blanc dans une petite bulle verte, à cheval sur le coin en haut à gauche de chaque note, dit que c'est une
  note d'information (`XICO` de `build_chapitre.py`, `.extra .xico` de `chapitre.css` ; « le i genre dans une petite
  bulle par-dessus notre bulle, en haut à gauche », JP). La page « Comment le livre fonctionne » l'explique (JP,
  19 octobre 2026).
- Le moteur n'imprime pas une note qui ne trouve pas de page. Il ne fait jamais une page qui porte seulement des notes
  (« un encadré qui occupe une page tout seul, c'est inutile »), ni une note sous un titre resté seul (« note verte
  pour remplir un trou qui existe pas »), parce que le titre suit son texte. Une note ne touche jamais le pied de page
  (« l'encadré vert embarque sur les chiffres en bas »), et le moteur vérifie la note elle-même, pas seulement son
  cadre.
- JP aime les notes vertes avec des photos pour reconnaître (le sapin, l'épinette noire, le cèdre).

### Les pages pleines et les pages vides

- Les photos vont seulement sur les pages complètement blanches (« juste les pages vides », JP, 19 octobre 2026), en
  pleine page et à fond perdu (`images/pleine-page/tome-N/`, posées par l'assembleur). Il n'y a pas de photo dans le
  vide du bas d'une page de texte, ni de pastilles tirées de l'image du tome.
- On résorbe une page qui n'a que quelques lignes (« celles qui ont juste genre une phrase dans une page, regarde pour
  compresser »). Le moteur refait le chapitre un peu plus serré (interligne 12,8 puis 12,6 pt) et garde l'essai s'il
  fait une page de moins.
- Aucune liste ni section ne déborde d'une ou deux lignes sur la page suivante (« il y a juste une ligne, c'est pas
  beau », JP, 18 octobre 2026), alors on resserre le texte pour qu'elle tienne. Aucun début de section n'est coupé en
  bas de page, et aucune colonne n'a plus d'un quart de vide à cause d'une figure.

### Le texte et les tableaux

- Le texte courant est justifié, avec la césure fr-CA, dans les chapitres, les notes et les pages des dangers (« le
  texte dans les livres, c'est pas étiré pour que ça soit égal ? », JP, 27 octobre 2026, sur l'épreuve du tome 1). Les
  cases de tableau restent alignées à gauche.
- Rien ne passe par-dessus le texte (« on dirait que le tableau est enligné sur l'autre texte », JP, 19 octobre 2026,
  p. 73 du tome 1). Après chaque montage, `pdftotext -bbox` puis `python3 design/outils/chevauchements.py` doivent dire
  « pages touchées : 0 ». Un tableau de cinq colonnes et plus prend toute la largeur, même sous une étape.

### La liste de contrôle du metteur en pages

- [ ] Les pages suivent l'ordre plus haut, du début du tome jusqu'à la procédure, et rien ne coupe la série orange,
  dont les planches sont en face.
- [ ] Le logigramme en double page a ses colonnes aux mesures plus haut.
- [ ] Chaque note « En plus » est dans un trou, une par page au plus, jamais au travers du texte, ni seule sur une
  page, ni sous un titre resté seul, ni sur le pied de page.
- [ ] Les photos sont seulement sur les pages blanches. Aucune page n'a que quelques lignes, aucune liste ne déborde
  d'une ou deux lignes, aucun début de section n'est coupé en bas de page et aucune colonne n'a plus d'un quart de vide.
- [ ] `chevauchements.py` dit « pages touchées : 0 ».
- [ ] Chaque planche tombe sur la page de son appel ou la suivante (pdftotext, page par page), avec son bandeau rouge et
  la flèche rouge de son appel.
- [ ] Chaque étape à pictogramme a son fond rose, son filet rouge, son nom et sa page en rouge, et les dangers
  tiennent à deux par page, sans avertissement à 8 pt.
- [ ] La section « Langue » du rapport de l'assembleur est à 0 avis, et `langue.py --assembleur` aussi. Rien ne part
  chez Lulu avec un avis ouvert.
- [ ] Avant d'envoyer quoi que ce soit à JP, l'orchestrateur relit lui-même chaque page à l'image contre cette liste, et
  il regarde chaque planche de près (mains, matières, feu) avec la barre de JP.

## Les planches et les images

L'agent qui dessine une planche reçoit aussi le cadre complet des planches
(`.claude/skills/planches/references/brief-agent.md`). Il lit au complet les skills `planches`, `dessin-notice` et
`encrage`, et `images/recommandations-planches.md` avec son tableau des planches signalées. L'agent qui cherche des
photos suit `CLAUDE.md` (« Les images »), la beauté d'abord, et chaque image entre dans `images/credits.md`. Ce qui
suit, ce sont les décisions de JP à garder sous les yeux, et la liste de contrôle vient à la fin.

### Les mains, les corps et les têtes

- Les mains passent par `h.formes.mainStock`, les mains Adobe Stock que JP a choisies le 18 octobre (feuille des ids
  `images/planches-src/_palette-mains-stock.js`). Seules les mains gardées servent (« y a des mains vraiment weird »,
  JP, 18 octobre), et le moteur refuse les autres. Les corps passent par `h.formes.corps`, de profil, et les têtes par
  `h.formes.teteSimple`. On ne dessine jamais à la main. On règle une prise laide par le cadrage, par une autre prise,
  ou en montrant l'objet seul.
- Une main qui appuie, frotte ou tient quelque chose à plat sur une surface a la paume vers la surface, et on voit le
  dos de la main (« la main est à l'envers, paume vers le sol il faut », JP, 18 octobre 2026, planche 04-41). Une main
  dessinée paume en l'air, ou recourbée en coupe, ne montre pas le geste de frotter.
- On ne déforme jamais une main de la bibliothèque, ni écrasée, ni étirée, ni coupée en biais pour la coucher (« laid
  en tabarnak, t'es-tu sérieux? », JP, 18 octobre 2026, sur une main écrasée pour la poser à plat). On cherche dans la
  feuille des mains (`images/_palette-mains-stock.svg`) celle qui a déjà la pose, comme `1-08` sans son objet pour une
  main à plat paume vers le bas, vue de côté, et on regarde le rendu de près avant de l'envoyer.
- Ce que le personnage porte suit sa taille, vignette par vignette. Quand une pose ou une vignette dessine le bonhomme
  plus petit, ses bottes, ses gants et son casque rapetissent avec lui (« dans l'image le bonhomme est plus petit mais
  il gardait la même grosseur de bottes », JP, 19 octobre 2026, planche 04-40). On prend l'échelle sur le corps rendu
  (le tibia, du genou à la cheville), pas sur l'échelle de la vue, comme `echelleBotte` de
  `images/planches-src/04-40.js`, et on regarde chaque vignette de près, à la taille d'impression.
- Quand la tête n'apprend rien, on cadre sur les mains, en gros plan avec l'objet, et le souffle ou la flamme entre par
  le bord (« dégueulasse la main et tout ; au pire fais le zoom sur une main, montre pas le visage », JP, 19 octobre
  2026, 13-40). Ça passe avant la règle du visage qui souffle.
- Un personnage qui tient, porte ou tire quelqu'un montre ses bras jusqu'aux mains (« manque des bras au bonhomme
  debout », JP, 26 octobre 2026, planche 26-09a). Quand le corps de l'autre cache le bras, on repeint par-dessus la
  partie qui passe devant (l'avant-bras qui sort sous l'aisselle), sans cacher sa tête ni ce qu'un repère désigne. Le
  bras repeint ne traverse jamais une autre partie du corps (« le bras traverse sa tête »), alors on repeint à son tour
  ce qui est devant (règle 15 de `images/recommandations-planches.md`).
- On ne dessine jamais de cheveux, et le visage seulement quand il sert (« on met jamais les cheveux, je veux plus les
  voir ; le visage est affiché seulement quand le visage fait une action ou qu'il y a une interaction », JP,
  18 octobre 2026). Le moteur des têtes ne dessine plus de cheveux. On met `visage: true` seulement si la bouche, les
  yeux ou le nez font le geste (souffler, boire, regarder un point) ou si deux personnes interagissent ; sinon la tête
  reste nue.

### Les matières et les objets

- On dessine une matière avec sa vraie fibre (« la laine d'acier, on dirait du poil de pubis », JP, 19 octobre 2026,
  planche 13-10). La laine d'acier, ce sont des fibres de métal longues et presque droites, croisées en couches, avec
  du jour au travers, jamais des boucles ni des frisettes. Avant de poser une matière (laine d'acier, poil, herbe,
  copeaux, corde), on la regarde en vrai ou en photo, et on fait une feuille d'essai.
- On dessine le bois comme du bois (« le bois pas beau, refais ça », JP, 19 octobre 2026, 13-40), avec l'écorce, les
  nœuds, un bout scié aux cernes décentrés avec une fente, des quartiers aux faces nettes et des pièces de grosseurs et
  d'angles variés. Jamais des tubes identiques empilés comme des crayons.
- Une coupe suit le contour de l'objet (« la coupe est pas bonne de la roche, c'est offset », JP, 19 octobre 2026,
  13-09). On découpe la face cassée ou sciée dans la silhouette, sans décalage ni débord.
- Un objet qui revient reprend le dessin réussi (« prends le nid [de la 13-40] qui est réussi », JP, 19 octobre 2026,
  13-10). On importe la fonction de la planche réussie au lieu de redessiner l'objet autrement.
- L'eau passe seulement par `h.a.hachure('eau')`, le bleu pâle et ses vaguelettes (« fais l'eau plus belle », JP,
  18 octobre).

### La planche et son texte

- Chaque rouge a son repère, et la légende dit ce qu'on doit y voir (règle 11 de `images/recommandations-planches.md`).
- On marque une autre façon de faire par un titre « Autre façon » ou « Sans… », un filet, et « au lieu de N »
  (règle 10).
- L'ordre des repères suit l'ordre des gestes du texte.
- Les légendes sont écrites en mots de tous les jours, sans tiret, sans pronominal.
- La taille suit le besoin, en pleine page, en demi-page (format `demi`) ou en petite planche (format `quart`).
- Le dessin n'a pas de ligne « Planche NN. Titre. », parce que le moteur pose le bandeau ; le `titre:` est court et
  juste.
- On refait au complet une planche du tableau des signalées, jamais par retouche.

### Les images d'ambiance et les couvertures

- On ne dessine pas une image d'ambiance (page de titre, couverture, scène) avec les formes simples, parce que JP l'a
  refusée (« c'est laid, je veux de quoi de beau visuellement », 16 octobre). Elle vient d'un jeu vectoriel
  professionnel acheté, converti et composé, ou d'une image fournie par JP. Depuis le 18 octobre 2026, les pages de
  titre et les couvertures des six tomes sont des linogravures générées (AI Horde, `images/tomes/essais-ia/`), que JP a
  choisies sur une planche numérotée. Elles ont trois encres (la couleur du tome, le papier, l'orange), un grand ciel
  calme en haut pour le titre, des collines basses, et aucun texte ni signature.
- On agrandit l'image retenue sans retouche qui floute (« la première était belle, fallait juste enlever 4-5
  étoiles »). On efface seulement les étoiles qui touchent une lettre, une à une, avec la couleur du ciel autour. On
  regarde chaque détail comme JP, et un objet qui n'a pas de sens part (« le feu qui sort de l'affaire qu'on frappe
  dessus, ça pas rapport, pi la niche à côté non plus », sur l'atelier). On l'enlève en recopiant la texture voisine de
  l'image, jamais en aplat.
- Les couvertures sont aux mesures Lulu Case Wrap du gabarit (19 octobre 2026, gabarit de Lulu dans
  `sources/lulu-captures/gabarit-couverture-tome-N-*.pdf`). Le wrap fait 0,625 po sur les quatre bords, les planches
  font 8,75 × 11,5 po, et la tranche suit le tableau de la couverture rigide. Tout le texte de la quatrième et du devant
  reste dans la zone sûre, à 0,625 po en dedans du bord de chaque planche. Rien n'est écrit dans la zone du code-barres
  (en bas à droite de la quatrième), et le fond couvre le wrap. `couverture.py` le vérifie à chaque rendu (« hors de la
  zone sûre »), et `--controle` pose le gabarit par-dessus ; le mode d'emploi est dans
  `images/tomes/couvertures/LISEZMOI.md`.

### Le courriel de JP

Il est permis comme contact dans l'en-tête User-Agent des requêtes à Wikimedia, qui en demande un (« c'est ben
correct qu'ils prennent mon adresse », JP, 19 octobre 2026). Ailleurs, il ne sort pas, et on ne l'écrit dans aucun
fichier du dépôt.

### Le regard

- Le regard qualité, c'est JP (« c'est moi le regard qualité », JP, 19 octobre 2026). L'orchestrateur lui montre
  l'image dès qu'elle est faite, et JP dit ce qui reste à faire. Pour les planches et les images, il n'y a pas de tour
  de relecture d'agents de plus ; cette règle est sortie pour le texte le 28 octobre 2026, mais elle reste ici
  (décision 1).
- Un relecteur qui n'a pas dessiné la planche la regarde une seule fois. Il donne cinq points au plus, sur ce qui était
  demandé et ce qui casse vraiment, sans refaire la critique de toute la planche (« 4 M de jetons pour 6 planches,
  sérieusement ? », JP, 19 octobre 2026). JP voit le reste en validant. Le PNG va dans `images/a-valider/`.

### La liste de contrôle des planches

- [ ] Les mains, les corps et les têtes viennent des moteurs (`mainStock`, `corps`, `teteSimple`), seulement les mains
  gardées, et aucune main n'est déformée ni dessinée à la main.
- [ ] Chaque main qui appuie ou frotte a la paume vers la surface. Chaque personnage qui tient quelqu'un montre ses bras
  jusqu'aux mains, sans traverser une autre partie du corps.
- [ ] Aucune tête n'a de cheveux, un visage paraît seulement s'il fait le geste ou s'il y a une interaction, et ce que
  le personnage porte suit sa taille dans chaque vignette.
- [ ] Chaque matière, le bois et l'eau sont dessinés comme en vrai, après une feuille d'essai. Chaque coupe suit le
  contour de l'objet, et un objet qui revient reprend le dessin réussi.
- [ ] Chaque rouge a son repère, les repères suivent l'ordre des gestes, une autre façon est marquée, et les légendes
  sont en mots de tous les jours, sans tiret ni pronominal.
- [ ] La taille suit le besoin, et le dessin n'a pas de ligne « Planche NN. Titre. ».
- [ ] Le composeur, le rendu, `verifier-planche.js` et `xmllint --noout` sont passés, et on a regardé le rendu de près,
  à la taille d'impression.
- [ ] Un seul second regard, cinq points au plus, et le PNG est dans `images/a-valider/`.
- [ ] Une image d'ambiance vient d'un jeu acheté, d'une linogravure choisie par JP ou d'une image de JP, et une
  couverture passe `couverture.py` sans « hors de la zone sûre ».
