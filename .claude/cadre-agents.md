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
- [ ] Huit sections : 1 En une ligne, 2 Quand l'utiliser, 3 Matériel, 4 Procédure, 5 Points de contrôle,
  6 Signes d'échec, 7 Danger, 8 Variante d'urgence. Plus de « Comment ça marche » : ce qu'il apprenait va dans
  l'étape qu'il explique. Les renvois « section N » suivent la numérotation du chapitre.
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

La procédure
- [ ] Une étape qui a plusieurs gestes se découpe en sous-étapes : le geste, où est la chose et comment la
  reconnaître, ce qu'on voit quand c'est fait ; chaque sous-étape renvoie au repère de sa planche, dans l'ordre
  des repères.
- [ ] Une autre façon de faire se dit comme une autre façon (« Autre façon : », « Sans tige de ferrocérium : »).
- [ ] L'urgence ne s'appuie pas sur une préparation qui n'a peut-être pas eu lieu ; un objet préparé d'avance
  s'explique.

La répétition
- [ ] Inventaire des faits du chapitre : un fait garde une seule place ; les rappels de sécurité dans leur étape
  et dans l'encadré danger seulement ; la variante d'urgence n'apprend que du neuf.

Les planches dans le texte
- [ ] Chaque planche est appelée « (planche NN-NN) » là où elle sert, une seule fois par phrase ; deux appels de
  planche pleine page ne tombent pas sur la même page ; chaque `apres` est un début de paragraphe unique.

Avant de rendre
- [ ] `python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-….md` : 0 tiret dans le texte, 0 « § »,
  0 mot banni ; chaque avis « tournure », « maxime », « pronominal » jugé un par un.

## Les planches (skill `planches`)

Le cadre complet est `.claude/skills/planches/references/brief-agent.md`. En bref :
- [ ] Mains par `h.formes.mainSimple`, corps par `h.formes.corps` (de profil), têtes par `h.formes.teteSimple` ;
  jamais de dessin à la main ; une prise laide se règle par le cadrage, une autre prise, ou l'objet seul.
- [ ] Une planche du tableau des signalées se refait au complet, jamais par retouche.
- [ ] Chaque rouge a son repère, et la légende dit ce qu'on doit y voir (règle 11).
- [ ] Une autre façon de faire est marquée : titre « Autre façon » ou « Sans… », filet, « au lieu de N » (règle 10).
- [ ] L'ordre des repères suit l'ordre des gestes du texte.
- [ ] Légendes en mots de tous les jours, sans tiret, sans pronominal.
- [ ] La taille selon le besoin : pleine page, demi-page (format `demi`) ou petite planche (format `quart`).
- [ ] Pas de ligne « Planche NN. Titre. » dans le dessin : le moteur pose le bandeau ; le `titre:` est court et juste.
- [ ] Second regard par un relecteur qui n'a pas dessiné la planche, jusqu'au oui ; PNG dans `images/a-valider/`.

## Le montage et la vérification (orchestrateur)

- [ ] Chaque planche tombe sur la page de son appel ou la suivante (pdftotext, page par page).
- [ ] Aucun début de section coupé en bas de page ; aucune colonne à plus d'un quart de vide à cause d'une figure.
- [ ] Le bandeau rouge de chaque planche, la flèche rouge de chaque appel.
- [ ] L'orchestrateur relit lui-même chaque page à l'image contre les listes ci-dessus, et regarde chaque planche
  de près (mains, matières, feu) avec la barre de JP, avant d'envoyer quoi que ce soit.
