# Le cadre de tout agent qu'on lance sur le livre

JP, 16 octobre 2026 : « pas juste ça [les mains], tout ce qu'on a parlé aussi sur le texte, pis tout ce qu'on se dit
depuis 3 jours ; ça sert à rien de faire ça si on refait toujours les mêmes erreurs ». Ce fichier est collé **au
complet** dans le brief de chaque agent, avant son sujet. L'agent rend, avec son rapport, la liste de contrôle de
sa partie, cochée ligne par ligne (« fait », ou ce qui reste et pourquoi). L'orchestrateur ne montre rien à JP sans
avoir repassé lui-même la même liste sur les pages montées.

**Toute correction de JP entre le jour même** dans le skill concerné (tableau de `ecriture`, règles de
`images/recommandations-planches.md`) **et dans la liste de ce fichier**. Une correction qui ne vit que dans
`suivi/plan-de-match.md` sera refaite par le prochain agent.

## Pour tout agent

- Lire `CLAUDE.md` au complet ; il prime.
- Lire au complet le skill de sa partie, avec ses tableaux.
- Lire `suivi/plan-de-match.md`, section « PAUSE du 15 octobre », points 1 à la fin : ce sont des décisions de JP
  qui ne sont pas encore appliquées partout ; un chapitre qu'on touche les applique.
- Règle 1 : aucun chiffre sans source enregistrée dans `/sources` et notée dans `suivi/NN-redaction.md` ;
  `[À VÉRIFIER]` sinon. La source sert à vérifier un fait, jamais à copier une forme.
- Ne rien commiter : l'orchestrateur commite.
- Rapport court, en français, avec la liste de contrôle cochée.

## Le texte (skill `ecriture`)

La forme du chapitre
- [ ] Sept sections : 1 En une ligne, 2 Quand l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle,
  6 Signes d'échec, 7 Variante d'urgence. Plus de « Comment ça marche » : ce qu'il apprenait va dans
  l'étape qu'il explique. **Plus de section Danger** (JP, 18 octobre 2026) : chaque danger a son pictogramme,
  expliqué une fois dans les pages des dangers du tome ; dans le chapitre, on pose le pictogramme dans l'étape où
  le danger se présente (`{!co}`, `{!generatrice}`…, ids dans `plan/dangers-inventaire.md`, section 1 ; `ours` et
  `orignal` sont deux pictogrammes distincts) et on y écrit ce qui est propre au chapitre (la distance, l'épaisseur,
  la durée, le geste). Le mécanisme général du danger n'est pas redit : il est dans la page du tome. Les renvois « section N » suivent la numérotation du chapitre.
- [ ] Rien sous le titre que la ligne de lieu (`**Maison**`, `**Chalet**`, `**Les deux**`) : pas de note de lieu.
  Ce qui change d'un lieu à l'autre se dit dans l'étape qui change.
- [ ] Section 2 : seulement quand l'utiliser ; aucune liste « mauvaise procédure », aucun contre-exemple évident.
- [ ] Le chapitre couvre l'année quand l'événement arrive l'été comme l'hiver ; ce qui change la nuit est marqué.

L'urgence
- [ ] La série orange joue la scène réelle : celui qui la lit n'a rien préparé ; d'abord ce qui sauve, ensuite ce
  qui organise ; chaque consigne de sécurité confrontée aux autres dangers du scénario.
- [ ] La pastille dit le temps qu'on a, à partir de ce qui déclenche la série ; ce temps est sourcé.
- [ ] Le logigramme est la version courte ; l'encadré orange est la version détaillée, et tout y est (le geste, le
  pourquoi, ce qu'il faut savoir pour le faire). Plus de partie « … : le détail ». Rien de l'orange ne se redit
  ailleurs.
- [ ] La page de droite d'un logigramme en double page répond à celle de gauche (JP, 18 octobre 2026, sur le ch. 12 :
  « mal centré ») : colonnes de 8,625 à 15,5 po (0,625 po au pli, 0,5 po au bord), comme la gauche de 0,5 à 7,375 po.
  Un couloir de lien qui passe d'une page à l'autre se tient à 8,7 po, et les boîtes de droite commencent alors à 8,9 po.
- [ ] **Les encadrés « En plus »** (JP, 18 octobre 2026 : « fais un mixte et mets des encadrés pour montrer que c'est
  de l'extra, en vert pâle ») : une section non numérotée `## En plus` à la fin du chapitre, un `### Titre` par encadré,
  **30 à 80 mots** (JP, même jour : « moins de texte ») ; un mélange de trois sortes seulement : la façon des Innus (ou
  d'une autre nation du Nord, avec pourquoi elle marche et ce qui la rend dangereuse si on change ses conditions), un
  fait, une photo pour reconnaître (ligne `![légende](images/extras/….jpg)`, licence dans `images/credits.md`).
  **Jamais de planche ni de dessin** (JP : « je veux pas de planche dans les affaires vertes : photo, ou faits, ou
  façon »). Ce qui est bon à savoir sans être nécessaire au geste ; rien de ce que le chapitre dit déjà. Ce sont des
  **notes laissées dans le texte**, pas des bulles (JP : « genre des notes laissées doucement dans le texte, la bulle
  est trop invasive ») : une feuille vert pâle droite (JP : « mets-les pas croches »), avec une ombre douce, sans bordure ni pastille, dans
  une colonne ; **une seule par page**, jamais empilées (JP : « je veux pas qu'ils soient cordés »), et **dispersées**
  (JP : « plus naturel, plus beau, plus d'ombre, dispersé ») : le moteur relève les pages qui ont de la place, place le
  plus de notes possible, met chacune sur la page de l'étape dont elle parle ou la plus proche. **Jamais au travers du
  texte** (JP, 19 octobre 2026 : « les encadrés verts JAMAIS au travers du texte, c'est du remplissage quand il reste
  de la place dans la page ») : la note va dans le trou, à la fin du texte de la page, jamais entre deux paragraphes,
  et la mise en pages ne pousse jamais le texte pour elle. Faute de trou près de son étape, la note va dans un autre
  trou du chapitre, et le bas de la dernière page en prend plusieurs, l'une sous l'autre (JP, 19 octobre 2026, sur le
  bas de la dernière page du ch. 5 : « ça c'est des belles places pour mettre des encadrés verts »). Un **« i » blanc dans une petite bulle verte**, à cheval sur le coin en haut à gauche de chaque note (`XICO` de
  `build_chapitre.py`, `.extra .xico` de `chapitre.css` ; JP : « le i genre dans une petite bulle par-dessus notre bulle,
  en haut à gauche »), dit que c'est une note d'information ; il est expliqué sur la page « Comment le livre fonctionne » (JP, 19 octobre
  2026). Une note dit son étape entre parenthèses quand elle en a une (« (étape 29) »). Une réserve de **4 à 8** par chapitre ; une note qui ne trouve pas de page ne
  s'imprime pas ; jamais une page qui ne porte que des notes (JP : « un encadré qui occupe une page tout seul, c'est
  inutile ») ; jamais une note qui touche le pied de page (JP : « l'encadré vert embarque sur les chiffres en bas » :
  le moteur vérifie la note elle-même, pas seulement son cadre).
- [ ] L'ordre du début du tome : la page de titre, puis la dédicace, puis le sommaire (JP, 18 octobre 2026 : « le texte
  va après la page couverture »).
- [ ] Le logigramme vient après le Matériel ; il ne redit aucun avertissement ; ses boîtes sont des phrases
  complètes (pas d'étiquette en raccourci).

La phrase
- [ ] Règle 0 : chaque phrase lue à voix haute à quelqu'un qui n'a pas lu le chapitre se comprend du premier coup.
  Un verbe qui dit le geste, on sait qui le fait, les mots de tous les jours avec leurs articles.
- [ ] Pas de loi en formule ni de paragraphe en paraboles : pas de « Une braise devient flamme quand… », pas de
  « la chaleur part à… », jamais « d'où ». On part de ce qu'on fait et de ce qu'on voit, et chaque mécanisme
  dit ce qu'il change à l'étape.
- [ ] Pas de formule « X passe là où Y ne passe pas » : on dit le mécanisme.
- [ ] Pas de maxime ni de chute en formule ; pas d'opposition fabriquée ; pas d'image poétique ni de petite scène.
- [ ] Pas de chose qui pense, sait, veut, attend, pardonne ou se croit (JP : « les phrases genre "la braise ne sait
  pas" ») : « le froid ne pardonne pas », « la braise ne sait pas », « une maison qui se croit chauffée », « le corps
  demande ». On dit le fait : ce qui arrive, et ce qu'on fait. Le script les repère (catégorie « tournure »).
- [ ] La consigne n'est jamais au pronominal (« le jeter », « on doit le cuire », pas « il se jette ») ; « se »
  reste quand la chose le fait toute seule.
- [ ] La consigne se dit comme une consigne, pas au présent qui décrit ; le sujet se nomme (« les gens qui »,
  jamais « ceux qui » en tête) ; l'ordre est naturel.
- [ ] On nomme la chose au lieu du possessif qui oblige à chercher (« le robinet de vidange du chauffe-eau »).
- [ ] Les mots de tous les jours : pas de mot de métier sans besoin (« carter »), pas de « seuil », pas de
  « un change », pas de nom latin, pas de notation que le lecteur n'emploie pas (« 84 mois (7 ans) »).
- [ ] Aucun tiret (— ou –) dans le texte ni dans les titres ; « section N », jamais « § ».
- [ ] Les titres de sous-sections sont des noms de gestes ou de choses, pas des maximes.
- [ ] Les tournures relevées par JP dans les pages des dangers (18 octobre 2026 : « tu as recommencé à faire des
  tournures de phrase bizarres ») : pas de « X ne fait pas Y : il fait Z », pas de « la couleur dit », pas de « la
  règle se brise », pas de chute en image (« tant que la route existe », « l'heure de la décision »). Le script ne
  les voit pas toutes : un éditeur qui n'a pas écrit la page la relit phrase par phrase (skill `ecriture`, tableau
  des corrections).

La procédure
- [ ] Une étape qui a plusieurs gestes se découpe en sous-étapes : le geste, où est la chose et comment la
  reconnaître, ce qu'on voit quand c'est fait ; chaque sous-étape renvoie au repère de sa planche, dans l'ordre
  des repères.
- [ ] Une autre façon de faire se dit comme une autre façon (« Autre façon : », « Sans tige de ferrocérium : »).
- [ ] L'urgence ne s'appuie pas sur une préparation qui n'a peut-être pas eu lieu ; un objet préparé d'avance
  s'explique.

La répétition
- [ ] Inventaire des faits du chapitre : un fait garde une seule place ; les rappels de sécurité dans leur étape
  et à côté de leur pictogramme seulement ; la variante d'urgence n'apprend que du neuf.
- [ ] Un nom ne revient pas à chaque phrase (JP, 19 octobre 2026, texte de Claude au dos : « 4 fois Claude en un
  paragraphe ») : une phrase qui porte plusieurs verbes, ou une tournure qui n'a pas besoin du sujet. Et un texte
  qui présente quelqu'un commence par ce qui le rend vivant, pas par une fiche (JP, sur « vit à Baie-Comeau et il
  aime le bois » : « c'est dull »).

Les planches dans le texte
- [ ] Chaque planche est appelée « (planche NN-NN) » là où elle sert, une seule fois par phrase ; deux appels de
  planche pleine page ne tombent pas sur la même page ; chaque `apres` est un début de paragraphe unique.

Avant de rendre
- [ ] `python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-….md` : 0 tiret dans le texte, 0 « § »,
  0 mot banni ; chaque avis « tournure », « maxime », « pronominal » jugé un par un.

## Les planches (skill `planches`)

Le cadre complet est `.claude/skills/planches/references/brief-agent.md`. En bref :
- [ ] Mains par `h.formes.mainStock` (les mains Adobe Stock choisies par JP le 18 octobre ; feuille des ids
  `images/planches-src/_palette-mains-stock.js`) : seulement les mains gardées (JP, 18 octobre : « y a des mains vraiment
  weird » ; le moteur refuse les autres) ; corps par `h.formes.corps` (de profil), têtes par `h.formes.teteSimple` ;
  jamais de dessin à la main ; une prise laide se règle par le cadrage, une autre prise, ou l'objet seul.
- [ ] Une main qui appuie, frotte ou tient quelque chose à plat sur une surface a **la paume vers la surface** : on voit
  le dos de la main (JP, 18 octobre 2026, planche 04-41 : « la main est à l'envers, paume vers le sol il faut »). Une
  main qui se lit paume en l'air ou recourbée en coupe ne frotte rien.
- [ ] **Une main de la bibliothèque ne se déforme jamais** : ni écrasée, ni étirée, ni coupée en biais pour la coucher
  (JP, 18 octobre 2026, sur une main écrasée pour la poser à plat : « laid en tabarnak, t'es-tu sérieux? »). On cherche
  dans la feuille des mains (`images/_palette-mains-stock.svg`) celle qui a déjà la pose (pour une main à plat paume
  vers le bas, vue de côté : `1-08` sans son objet), et on regarde le rendu de près avant de l'envoyer.
- [ ] **Ce que le personnage porte suit sa taille, vignette par vignette** : quand une pose ou une vignette dessine le
  bonhomme plus petit, ses bottes, ses gants, son casque rapetissent avec lui (JP, 19 octobre 2026, planche 04-40 :
  « dans l'image le bonhomme est plus petit mais il gardait la même grosseur de bottes »). On prend l'échelle sur le
  corps rendu (le tibia, du genou à la cheville), pas sur l'échelle de la vue : voir `echelleBotte` de
  `images/planches-src/04-40.js`. Regarder chaque vignette de près, à la taille d'impression.
- [ ] **La règle 1 vise les chiffres** (JP, 19 octobre 2026, sur le travois du ch. 16 : « pas besoin de source ») : un
  geste sans chiffre n'a pas besoin de source ; un chiffre en a toujours besoin, sinon `[À VÉRIFIER]`.
- [ ] **Un livre ouvert** (JP, 19 octobre 2026) : pas l'âge des enfants de JP (« de jeunes enfants », sauf un âge qui
  change le geste) ; un calcul fait pour sa famille se dit « pour une famille de quatre », comme un exemple, mêmes
  chiffres. Vaut pour tout le livre (grande passe des tomes 2 à 6).
- [ ] **Une matière se reconnaît à sa vraie fibre** (JP, 19 octobre 2026, planche 13-10 : « la laine d'acier, on dirait du
  poil de pubis ») : la laine d'acier, ce sont des fibres de métal longues et presque droites, croisées en couches, avec du
  jour au travers ; jamais des boucles ni des frisettes. Avant de poser une matière (laine d'acier, poil, herbe, copeaux,
  corde), on la regarde en vrai ou en photo et on fait une feuille d'essai.
- [ ] **Le bois se dessine comme du bois** (JP, 19 octobre 2026, 13-40 : « le bois pas beau, refais ça ») : écorce,
  nœuds, bout scié aux cernes décentrés avec une fente, quartiers aux faces nettes, pièces de grosseurs et d'angles
  variés ; jamais des tubes identiques empilés comme des crayons.
- [ ] **Une coupe suit le contour de l'objet** (JP, 19 octobre 2026, 13-09 : « la coupe est pas bonne de la roche, c'est
  offset ») : la face cassée ou sciée est découpée dans la silhouette, sans décalage ni débord.
- [ ] **Un objet qui revient reprend le dessin réussi** (JP, 19 octobre 2026, 13-10 : « prends le nid [de la 13-40] qui
  est réussi ») : on importe la fonction de la planche réussie, on ne redessine pas l'objet autrement.
- [ ] **Quand la tête n'apprend rien, on cadre sur les mains** (JP, 19 octobre 2026, 13-40 : « dégueulasse la main et
  tout ; au pire fais le zoom sur une main, montre pas le visage ») : gros plan des mains et de l'objet, le souffle ou
  la flamme qui entre par le bord ; ça passe avant la règle du visage qui souffle.
- [ ] Une planche du tableau des signalées se refait au complet, jamais par retouche.
- [ ] **Jamais de cheveux, et le visage seulement quand il sert** (JP, 18 octobre 2026 : « on met jamais les cheveux, je veux plus les voir ; le visage est affiché seulement quand le visage fait une action ou qu'il y a une interaction »). Le moteur des têtes ne dessine plus de cheveux. `visage: true` seulement si la bouche, les yeux ou le nez font le geste (souffler, boire, regarder un point) ou si deux personnes interagissent ; sinon la tête reste nue.
- [ ] L'eau par `h.a.hachure('eau')` seulement : le bleu pâle et ses vaguelettes (JP, 18 octobre : « fais l'eau plus belle »).
- [ ] Chaque rouge a son repère, et la légende dit ce qu'on doit y voir (règle 11).
- [ ] Une autre façon de faire est marquée : titre « Autre façon » ou « Sans… », filet, « au lieu de N » (règle 10).
- [ ] L'ordre des repères suit l'ordre des gestes du texte.
- [ ] Légendes en mots de tous les jours, sans tiret, sans pronominal.
- [ ] La taille selon le besoin : pleine page, demi-page (format `demi`) ou petite planche (format `quart`).
- [ ] Pas de ligne « Planche NN. Titre. » dans le dessin : le moteur pose le bandeau ; le `titre:` est court et juste.
- [ ] **Le regard qualité, c'est JP** (JP, 19 octobre 2026 : « c'est moi le regard qualité ») : l'orchestrateur lui
  montre l'image dès qu'elle est faite, sans tour de relecture d'agents de plus ; JP dit ce qui reste à faire.
- [ ] Second regard par un relecteur qui n'a pas dessiné la planche : **un seul tour**, cinq points au plus, ce qui
  était demandé et ce qui casse vraiment, pas une nouvelle critique de toute la planche (JP, 19 octobre 2026 : « 4 M de
  jetons pour 6 planches, sérieusement ? ») ; JP voit le reste en validant. PNG dans `images/a-valider/`.
- [ ] Une image d'ambiance (page de titre, couverture, scène) ne se dessine pas avec les formes simples : JP l'a
  refusée (16 octobre : « c'est laid, je veux de quoi de beau visuellement »). Elle vient d'un jeu vectoriel
  professionnel acheté, converti et composé, ou d'une image fournie par JP. **Depuis le 18 octobre 2026**, les pages
  de titre et les couvertures des six tomes sont des **linogravures générées** (AI Horde, `images/tomes/essais-ia/`),
  choisies par JP sur une planche numérotée : trois encres (la couleur du tome, le papier, l'orange), un grand ciel
  calme en haut pour le titre, collines basses, aucun texte ni signature. L'image retenue s'agrandit sans retouche qui
  floute (JP : « la première était belle, fallait juste enlever 4-5 étoiles ») : on n'efface que les étoiles qui
  touchent une lettre, une à une, avec la couleur du ciel autour. On regarde chaque détail comme JP : un objet qui
  n'a pas de sens part (JP, sur l'atelier : « le feu qui sort de l'affaire qu'on frappe dessus, ça pas rapport, pi la
  niche à côté non plus ») ; on l'enlève en recopiant la texture voisine de l'image, jamais en aplat.

## Le montage et la vérification (orchestrateur)

- [ ] Aucun vérificateur sécurité : JP n'en veut jamais (18 octobre 2026).
- [ ] **À une refonte, le vérificateur technique ne revérifie pas ce qui l'a déjà été** (JP, 19 octobre 2026 : « fuck les
  sources, on a pas déjà fait ce travail-là ? »). Il compare au texte d'avant (git) et ne vérifie à la source que ce
  qui est nouveau ou qui change de sens : un chiffre ou un fait nouveau, une note En plus, une série orange réécrite,
  un danger déplacé qui perd son fait propre, une contradiction avec un autre chapitre ou les pages des dangers. Un
  chiffre qui ne fait que changer de section ne se rouvre pas. L'éditeur prend trois chapitres à la fois.
- [ ] **Rien ne reste blanc** (JP, 19 octobre 2026 : « de la place pour du stock, genre photo ou note verte » ; « manque
  de photos dans le livre, utilisons ces espaces pour en mettre » ; « tu commences à comprendre le principe ? ») :
  une note verte au plus par page (« trop de notes vertes, c'est pas beau non plus ») ; le vide qui reste au bas d'une
  page reçoit une photo (`images/vides/NN-*.jpg`, ce dont le chapitre parle, puis `images/pleine-page/tome-N/`), en
  bande sur toute la largeur ; pas de pastilles tirées de l'image du tome (JP : « non, j'aime pas ça les pastilles
  finalement, mets des photos ») ; une page blanche
  devient une photo de la nature du Québec en pleine page, fond perdu (« genre pleine page, pas de blanc »). Une note
  ne se pose jamais sous un titre resté seul (« note verte pour remplir un trou qui existe pas ») : le titre suit son
  texte. JP aime les notes vertes avec des photos pour reconnaître (le sapin, l'épinette noire, le cèdre).
- [ ] **Jamais le courriel de JP dans une requête** : ni dans l'en-tête User-Agent (Wikimedia en demande un ; on
  écrit « ManuelDuNord/1.0 (projet privé) »), ni dans une adresse, ni dans un envoi. Il ne sort pas du dépôt.
- [ ] **Rien ne passe par-dessus le texte** (JP, 19 octobre 2026, p. 73 du tome 1 : « on dirait que le tableau est
  enligné sur l'autre texte ») : après chaque montage, `pdftotext -bbox` puis `python3 design/outils/chevauchements.py`
  doit dire « pages touchées : 0 ». Un tableau de cinq colonnes et plus prend toute la largeur, même sous une étape.
- [ ] Le logigramme tombe juste après le Matériel, et **la procédure toujours après lui** (JP, 18 octobre : « c'est lui
  qu'on veut en premier » ; « la procédure va toujours APRÈS le diagramme ») : son ancre est le dernier item du
  Matériel ; le moteur ferme la page à l'ancre et la procédure attend la double page.
- [ ] Pas de vide inutile (JP, même jour : « beaucoup de pages vides, faut optimiser l'espace ») : un chapitre peut
  ouvrir sur une page de gauche ; l'assembleur choisit le côté d'ouverture qui coûte le moins de pages.
- [ ] Le pictogramme de danger se pose au début de la phrase de l'étape ; le moteur met l'étape sur fond rose pâle avec un
  filet rouge, et à droite le pictogramme en gros, son nom court et la page du danger (JP, même jour : « les dangers
  en dessous du pictogramme pointent à la page du danger » ; « C, mais avec texte et page » ; puis « mets la page de la même couleur que le nom » : la page est en rouge, sous le nom, dans le même style). Chaque danger a sa page au début du tome, une seule (« chacun sa propre page, pas
  plus qu'une page ») : une page de danger qui déborde se resserre, ou son texte se coupe.
- [ ] **La série orange vient tout de suite après le logigramme, en tête de la section 4 Procédure**, en premières étapes
  (1, 2, 3…) ; jamais dans la variante d'urgence ni plus loin dans la procédure (JP, 18 octobre 2026 : « les premières
  minutes doivent toujours être directement après les [logigrammes] associés, je comprends pas, je te l'ai déjà dit » ;
  le rédacteur du ch. 12 l'avait mise au début de la section 7).
- [ ] **Un sujet par série orange** (JP, 18 octobre 2026, sur le ch. 15 : « quand on traite deux sujets, on les sépare,
  pour permettre aux planches reliées au sujet d'être plus proches ») : « On passe à travers la glace » et « Quelqu'un
  d'autre passe à travers la glace » sont deux séries, chacune son intertitre `{.orange …}` et sa pastille ; les numéros
  d'étapes continuent. Le moteur pose les planches d'une série tout de suite après elle, avant la série suivante.
- [ ] La série orange se lit d'un trait, sans planche ni page au milieu (JP, 18 octobre : « premières minutes est
  scindé, il doit se suivre ») : les planches appelées dans l'orange gardent leur ancre à l'étape qui les appelle ; le
  moteur les sort de l'orange et les pose sur la page d'en face, ou la suivante (JP, 18 octobre 2026 : « si les planches
  sont nommées dans le cadre orange, ça peut occuper la place voisine » ; « sur la page d'en face ») : une planche pleine
  page prend sa page, une demi-page ouvre la page suivante et le texte continue dessous. Le texte qui suit la série
  remplit la page où elle finit.
- [ ] Aucune liste ni section qui déborde d'une ou deux lignes sur la page suivante (JP, 18 octobre : « il y a juste
  une ligne, c'est pas beau ») : on resserre le texte pour qu'elle tienne.

- [ ] Chaque planche tombe sur la page de son appel ou la suivante (pdftotext, page par page).
- [ ] Aucun début de section coupé en bas de page ; aucune colonne à plus d'un quart de vide à cause d'une figure.
- [ ] Le bandeau rouge de chaque planche, la flèche rouge de chaque appel.
- [ ] L'orchestrateur relit lui-même chaque page à l'image contre les listes ci-dessus, et regarde chaque planche
  de près (mains, matières, feu) avec la barre de JP, avant d'envoyer quoi que ce soit.
