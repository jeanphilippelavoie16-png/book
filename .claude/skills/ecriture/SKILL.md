---
name: ecriture
description: Écrire, réécrire ou resserrer le texte du Grand Livre du Chalet comme un livre technique professionnel, informatif, qui ne sonne pas écrit par une IA. Utilise ce skill dès qu'on écrit ou retouche un chapitre, un encadré, une étape, une ligne de matériel, une légende ou une note ; dès qu'on lance une passe de style sur un ou plusieurs chapitres ; et chaque fois que JP dit « trop AI », « fils d'la AI », « c'est inutile », « c'est long pour rien », « c'est poétique », « faut que ça soit informatif » ou se plaint des tirets. Il porte la phrase et le mot. Le fond (chiffres, sources, sécurité) est dans CLAUDE.md ; la structure des neuf points, dans gabarit-chapitre.md.
---

# L'écriture : un livre technique, pas un texte d'IA

Le Grand Livre du Chalet se lit à la lampe frontale, dans l'urgence, par quelqu'un de compétent de ses
mains. Chaque phrase doit lui donner un fait, un geste, une mesure ou un signe à reconnaître. Rien d'autre.

## Ce que JP a dit (15 octobre 2026, relecture du tome 1 au crayon)

- « Le texte est écrit bizarrement, trop AI. **Faut que ça soit informatif**, tout le livre. »
- « Ce que j'ai surligné, c'est des exemples de texte inutile. Je veux pas de fils d'la AI. »
- « "Sans perdre la viande **de l'automne**" : "de l'automne" est inutile. C'est des mots comme ça
  qu'il faut éliminer. »
- « Les tournures genre "à attendre un camion qui ne viendra pas", c'est pas beau, c'est inutile,
  c'est poétique mais dégueulasse. »
- « Sans que ça ait l'air d'un AI qui a écrit. Enlève les **—** partout aussi : y a juste les AI qui
  mettent ça dans des phrases. »
- Sur « …les aliments s'appliquent : il n'y a ni entrée électrique, ni aqueduc, ni égout » : « ni
  aqueduc, ni égout, ni blablabla, inutile, on le sait. La phrase peut s'arrêter à "les aliments
  s'appliquent". »
- Sur « un tuyau vide ne fend pas », dans le « Pourquoi ça marche » : « no shit, man ». La conséquence
  évidente d'un mécanisme qu'on vient de dire ne s'écrit pas.

Ses pages annotées sont dans `livre/relecture/notes/` (à régénérer, voir
`design/outils/relecture/LISEZMOI.md`). Le jaune et le rouge, c'est ce qu'il ne veut plus voir.

## Le test

Pour chaque phrase, puis pour chaque mot : **sans lui, le lecteur sait-il moins quoi faire ?** Si non,
il saute. Si oui mais qu'il est mal dit, on le redit simplement, comme on l'expliquerait à quelqu'un
dans le garage.

## Comment s'écrit une phrase du livre

1. **Une phrase, une information.** Deux faits, deux phrases.
2. **Le fait d'abord, la raison ensuite**, et seulement si la raison change ce qu'on fait.
   « Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant. »
3. **La condition avant le geste.** « Si l'eau est trouble, la filtrer avant de la désinfecter. »
4. **Les étapes à l'infinitif**, comme le reste du livre : « Couper le disjoncteur principal. » La prose
   (§2, §3, §9 hors étapes numérotées) dit « on » : « On coupe le disjoncteur avant de brancher. »
5. **Le chiffre avec son unité**, en chiffres : 74 °C, 2 gouttes par litre, 48 h. Un chiffre se
   cherche à la source avant d'être écrit (règle 1 de `CLAUDE.md`). À défaut de chiffre, le **repère
   observable** : la couleur, le son, la consistance, ce que ça fait sous le doigt.
6. **Le mot exact, et toujours le même.** Un objet garde son nom d'un bout à l'autre du chapitre ; on
   ne varie pas les synonymes pour faire joli. « Génératrice » partout, pas « groupe », puis
   « appareil », puis « machine ».
7. **La voix active, un sujet concret.** « Le monoxyde endort », pas « l'endormissement est causé par ».
8. **Dire ce qui marche, pas ce qui ne marche pas.** JP : « Je veux pas savoir qu'est-ce qui va pas au
   feu, je veux savoir c'est quoi qui va au feu. » On nomme ce qu'on prend, ce qu'on fait, ce qui
   convient : « Tout contenant de métal va sur le feu. » La liste de ce qui ne convient pas sort, sauf
   quand l'erreur tue et que le réflexe naturel y mène ; elle va alors dans l'encadré danger, une fois.
9. **Un avertissement = le mécanisme + ce qui arrive + quoi faire.** Jamais « attention » tout seul.
10. **Du français québécois clair, pas du télégraphe.** La phrase garde ses articles et ses liaisons.
    Couper n'est pas compresser.

## Ce qui sort

### Les phrases

| Ce qui sort | Exemple réel du livre | Ce qu'on écrit |
| --- | --- | --- |
| La phrase qui parle du livre, du chapitre, de la page | « Cette page ne suit pas le gabarit du livre. Elle est faite pour être ouverte à la lampe frontale. » ; « C'est le renversement du chapitre. » | *(rien)* |
| La statistique d'ambiance | « En 2024, le courant a manqué 436 minutes par client alimenté… » | *(rien)*, ou le chiffre s'il change le geste |
| La justification du cadrage | « C'est le scénario du chalet parce que c'est là que sont la scie à chaîne, la hache, l'arme… » | *(rien)* |
| La chute en formule | « …juste une impression. » ; « La plus courte commande. » ; « …pas quand le tuyau siffle. » | La phrase s'arrête au fait |
| L'opposition fabriquée | « Ce qui détruit la plomberie n'est pas le froid mais l'expansion de l'eau. » | « Un tuyau fend parce que l'eau prend du volume en gelant. » |
| L'image, la petite scène, la personnification | « …une famille dans le noir, à attendre un camion qui ne viendra pas. » ; « une maison qui se croit chauffée au mazout » ; « la panique fait manquer » | « Tant que le mât n'est pas réparé, la maison reste sans courant, même quand la rue est rebranchée. » |
| Le superlatif qui ne se mesure pas | « …au ch. 77, le chapitre le plus dangereux de l'ouvrage. » | « …au ch. 77. » |
| La révélation en deux temps | « Le réglage est tout, et il tient en une phrase : la mèche ne dépasse presque pas. » | « La mèche ne dépasse presque pas. » |
| La justification que le lecteur connaît déjà, après les deux-points | « …seules les parties sur le froid, la plomberie et les aliments s'appliquent : il n'y a ni entrée électrique, ni aqueduc, ni égout. » (JP : « inutile, on le sait ») | « …seules les parties sur le froid, la plomberie et les aliments s'appliquent. » |
| La justification collée au geste | « Ne pas rester dans l'auto : la tôle n'arrête rien. » | « Entrer dans un bâtiment. » |
| La conséquence évidente d'un fait qu'on vient de dire | « Un tuyau fend parce que l'eau prend du volume en gelant : un tuyau vide ne fend pas. » (JP : « no shit ») | « Un tuyau fend parce que l'eau prend du volume en gelant. » |
| L'annonce et le résumé | « Voici ce qu'il faut savoir. » ; « En somme… » | *(rien)* |
| La question rhétorique | « Pourquoi ? Parce que… » | Le fait |

### Les mots

| Ce qui sort | Exemple | Après |
| --- | --- | --- |
| Le complément qui décore | « sans perdre la viande **de l'automne** » | « sans perdre la viande » |
| L'adjectif ou l'adverbe qui redit | « un **véritable** danger », « **complètement** gelé » | « un danger », « gelé » |
| Les mots vides | déjà, encore, tout, bien, vraiment, simplement, exactement, précisément, littéralement, en effet, ainsi, d'ailleurs, en réalité | à couper quand ils n'ajoutent rien |
| Le vocabulaire d'IA | crucial, essentiel, clé, primordial, véritable, incontournable, « il est important de noter que » | le fait seul |
| Le tour long | « le fait de », « ce qui permet de », « il convient de », « au niveau de » | la forme courte |
| La précision que le lecteur a déjà | « dans la maison, à l'intérieur » | « dans la maison » |
| « C'est… qui / que » de mise en relief | « C'est la cendre qui tient le mieux. » | « La cendre tient le mieux. » |

### Le réel de l'urgence

JP, sur le logigramme des retombées : « Voir que t'as le temps d'aller chercher la radio de l'auto quand
une bombe nucléaire pète. » ; « La bombe vient de tomber, on n'a pas encore de sas, TOUT EST NOUVEAU. »

- **Un geste urgent se fait avec ce qu'on a sous la main, à ce moment-là**, par quelqu'un qui n'a rien
  préparé. Ce qui demande une préparation (une pièce scellée d'avance, un sas, une trousse) vient après,
  ou dans « Avant », jamais dans les premières minutes.
- **L'ordre réel** : d'abord ce qui sauve dans les secondes et les minutes, ensuite ce qui organise.
  La radio, l'inventaire, le tri viennent quand tout le monde est à l'abri.
- **Les mots de tout le monde.** Pas de jargon que le lecteur ne dirait pas : « sas », « source
  radioactive perdue » (JP : « ça veut rien dire »). Ou on dit la chose simplement, ou elle sort.
- **Le mot général quand le détail n'apporte rien** : « les animaux », pas « les chiens et les poules »
  (JP : « personne a des poules, man »).

### La répétition

JP : « Dans les textes, y a beaucoup de répétition aussi, faut slaquer la répétition. »

- **Un fait se dit une fois par chapitre**, à l'endroit où il sert. Ailleurs, un renvoi court
  (« étape 12 », « §8 ») ou rien.
- **Chaque section apporte du neuf.** « En une ligne », « Quand l'utiliser », « Pourquoi ça marche »,
  la procédure, les points de contrôle, le danger et la variante d'urgence ne redisent pas ce qu'une
  autre section a dit. Le §3 donne le mécanisme ; la procédure ne le réexplique pas, elle s'en sert.
- **Les rappels de sécurité** du tableau de `CLAUDE.md` se disent dans l'étape où ils s'appliquent et
  dans l'encadré du §8. Pas une troisième fois.
- **Un avertissement se dit une fois.** JP, sur « le barbecue ne rentre pas dans la maison » redit en
  §9 après le §8 : « ON LE SAIT, ON L'A DÉJÀ DIT. » Une fois dans l'encadré danger ; ailleurs, rien, pas
  même « (section 8) » au bout d'une phrase qui le redit.
- **Pas de redite d'une phrase à l'autre** : la deuxième phrase qui reformule la première sort.
- **Le même mot pour la même chose** reste (règle 6 plus haut) : on chasse l'idée répétée, pas le terme
  technique.

Le script de contrôle liste les suites de mots qui reviennent dans le chapitre ; chacune se juge.

### Le tiret

**Aucun tiret (— ou –) comme ponctuation dans une phrase.** Le livre en avait 5 665. Selon le cas :

- la virgule : « Le bois, sec et fendu, se range… » ;
- les deux-points : « Une seule règle : la génératrice dehors. » ;
- les parenthèses, pour un ajout court ;
- le point, pour deux phrases ;
- la réécriture, souvent la meilleure.

Ça vaut aussi pour les lignes de matériel (« **Thermomètre à sonde** : porte les 74 °C à cœur. »), les
titres, les tableaux et les notes. Les intervalles s'écrivent avec « à » (« 4 à 6 h »). Les traits
d'union des mots composés restent.

### Les guillemets

Pas de guillemets d'ironie ni de « mots entre guillemets » pour faire image. Pas de citation de source :
la provenance vit dans `suivi/`, jamais dans le texte. Les guillemets restent pour un mot qu'on dit à
voix haute ou qu'on lit sur une étiquette.

## Les planches se nomment dans le texte

JP : « Il faut mentionner les planches pour les retrouver. » Chaque planche est appelée dans le texte, à
l'endroit où elle sert, par son numéro entre parenthèses : « …deux bâches en chicane (planche 04-40). »
L'appel va dans la phrase d'ancrage de la planche (`design/epreuves-livre/placements-tome-N.json`) ou
juste avant. Une planche que le texte n'appelle pas se perd dans le livre.

## Ce qui ne sort jamais

- **Un fait, un chiffre, une mesure, une étape, un repère observable.** On coupe le remplissage, pas le
  contenu. Une passe qui fait perdre un fait a échoué, même si le texte est plus court.
- **Les neuf rappels de sécurité** du tableau de `CLAUDE.md`, partout où ils s'appliquent.
- **Le mécanisme d'un danger.** « Le monoxyde n'a ni odeur ni couleur, on s'endort au lieu de sortir. »
- **Le fait qui surprend** le lecteur parce que le réflexe normal est le mauvais.
- **Les notes de bas de page** qui décrivent un signe, **les renvois** (« ch. 74 »), **les appels de
  figure et de planche**.
- **Les phrases d'ancrage des planches.** Les planches se placent après une phrase précise, notée dans
  `design/epreuves-livre/placements-tome-N.json`. Avant de couper une phrase, cherche-la dans ce
  fichier ; si elle y est, garde-la ou déplace l'ancre dans le même mouvement.

## La passe sur un chapitre

1. **Lis** `CLAUDE.md`, `gabarit-chapitre.md` et le chapitre en entier. Repère ses ancres de planches.
2. **Passe 1, les phrases.** Le tableau « Les phrases », du début à la fin.
3. **Passe 2, les mots.** Phrase par phrase, le tableau « Les mots ».
4. **Passe 3, les tirets et les tics.** Le script le compte :
   ```bash
   python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md
   ```
   Il liste les tirets, les mots vides, le vocabulaire d'IA et les tournures en relief qui restent, avec
   leur ligne. Chaque ligne se juge : un « tout » qui veut dire « tout » reste.
5. **Passe 4, les invariants.** Compare l'avant et l'après :
   ```bash
   git show HEAD:chapitres/NN-titre.md > /tmp/avant.md
   python3 .claude/skills/ecriture/scripts/controle.py chapitres/NN-titre.md --avant /tmp/avant.md
   ```
   Il dit ce qui a disparu : chiffres avec unité, renvois de chapitre, notes, figures, étapes
   numérotées, rappels de sécurité, ancres de planches. **Tout ce qu'il signale se justifie ou se remet.**
6. **Relis à voix haute**, une section à la fois. Une phrase qui accroche à l'oral se réécrit.
7. **Le rapport** : mots avant et après, tirets avant et après, et les coupes dont tu doutes.

## Avant de rendre

- [ ] Plus une seule phrase qui parle du livre, du chapitre ou de la page.
- [ ] Plus d'image, de scène, de personnification, de chute en formule.
- [ ] Zéro tiret de ponctuation.
- [ ] Chaque fait dit une seule fois ; les redites signalées par le script sont réglées.
- [ ] Zéro « village », zéro « char » (on écrit « auto »), zéro « Baie-Comeau », zéro « JP », pas l'âge
      des enfants de JP (« de jeunes enfants ») ; un âge qui est un fait (dose, seuil) reste.
- [ ] Le contrôle des invariants ne signale rien d'inexpliqué.
- [ ] Les ancres de planches sont intactes, et chaque planche est appelée dans le texte (« planche NN-NN »).
- [ ] Aucun chiffre nouveau sans source enregistrée dans `/sources`.
- [ ] Le texte se lit d'un trait, en français québécois, sans télégraphe.
