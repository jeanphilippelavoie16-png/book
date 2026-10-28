# Audit de l'écriture : la voix, lot C (tome 2)

28 octobre 2026. Un seul regard : **la voix**, le mot qu'on dit contre le mot qu'on écrit. Le registre visé : un
Québécois qui explique à son voisin, en français correct (ni joual, ni mot de livre). Lot lu au complet :
`chapitres/25-le-froid-lui-meme.md`, `chapitres/26-soigner-quand-il-n-y-a.md`,
`chapitres/39-des-enfants-de-4-et-6-ans.md`. Aucun fichier du livre n'est touché. Les réécritures ci-dessous
n'ajoutent aucun fait ni chiffre ; elles sont passées par `controle.py` (0 tiret, les avis restants jugés plus bas)
et par `langue.py` (2 avis, jugés : « bécosse » est un mot du Québec reconnu ; la virgule demandée après « Dans
combien d'heures » est fausse, c'est une interrogative indirecte).

Ce que je ne juge pas ici : le tempo, le moule « fait : conséquence », la longueur, la répétition, la structure des
chapitres (note de lieu, sections 8 et 9, « mauvais chapitre »), l'exactitude des faits. Je les nomme seulement
quand ils touchent la voix.

## 1. Les mesures

`tempo.py --par-fichier` sur le lot :

| texte | mots | phr. | m/phr | var. | ≤6 % | ≥30 % | mono % | « : » % | fait:csq % | liais./1000 | même début % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 25-le-froid-lui-meme.md | 4805 | 243 | 19,8 | 0,79 | 12,8 | 16,5 | 18,6 | 36,2 | 23,5 | 6,0 | 2,9 |
| 26-soigner-quand-il-n-y-a.md | 5903 | 275 | 21,5 | 0,54 | 3,6 | 16,7 | 32,1 | 29,5 | 22,9 | 4,6 | 5,5 |
| 39-des-enfants-de-4-et-6-ans.md | 5593 | 312 | 17,9 | 0,63 | 16,0 | 16,0 | 19,9 | 27,2 | 19,6 | 3,2 | 2,9 |
| ENSEMBLE | 16301 | 830 | 19,6 | 0,66 | 11,0 | 16,4 | 23,5 | 30,6 | 21,8 | 4,5 | 3,7 |

Les marques de la voix, comptées dans les fichiers (regex Python, tableaux compris ; pour 1000 mots de `tempo.py`) :

| marque | ch. 25 | ch. 26 | ch. 39 |
| --- | --- | --- | --- |
| « ça » | 7 (1,5) | 17 (2,9) | 19 (3,4) |
| « c'est » | 28 (5,8) | 9 (1,5) | 21 (3,8) |
| « parce que » | 5 | 2 | 4 |
| « la personne » | 12 | 55 | 0 |
| « victime », « secouriste » | 4 et 3 | 0 | 0 |
| opposition « …, pas … », « plutôt que », « ce n'est pas …, c'est … » | 19 | 9 | 16 |
| « c'est X qui / que » (relief) | 7 | 0 | 6 |
| « Ce qu'on perd est… », « Ce qui reste est… » | 0 | 0 | 7 |
| noms latins | 4 | 0 | 9 |
| « § » et « → » | 2 | 0 | 5 |
| tirets (— ou –) | 49 | 2 | 42 |

`controle.py`, section « Mots de livre » : 5 avis au ch. 25 (« à défaut » trois fois, « aspect », « d'apparence »),
4 au ch. 26 (« somnolente » trois fois, « avec peine »), 6 au ch. 39 (« somnolence », « somnolent », « débuter »,
« afin de », « à défaut », « d'apparence »). C'est le tiers de ce que j'ai relevé à l'oreille : le script attrape des
mots, et la voix de livre est surtout dans la tournure.

## 2. Ce que j'entends dans ces pages

Le lot a deux voix. **Les ch. 25 et 39 n'ont pas eu leur refonte** (neuf sections, section Danger, « village », 49 et
42 tirets) : ils parlent comme un guide médical traduit (ch. 25) ou comme un essai qui finit chaque paragraphe sur une
formule (ch. 39). **Le ch. 26 est refait** : plus de victime ni de secouriste, « la personne » partout, des consignes
à l'infinitif, et des passages qui sonnent juste (section 4 plus bas). Mais il garde une grammaire de l'écrit que
rien ne vise : « Ce peut être », « qu'on n'en puisse plus », « le départ peut se faire de nuit », « l'aggravation »,
« on est tenté de », et **« le sommeil »**, le mot même que JP a refusé sur la page du monoxyde (« on a sommeil, qui
qui dit ça ») : la regex du script cherche « avoir sommeil », pas « donner le sommeil ».

Le même fait, le monoxyde, dit dans quatre voix du lot :

- ch. 39, l.230 : « Gaz incolore et inodore produit par toute combustion incomplète » (la voix du manuel de chimie) ;
- ch. 25, l.341 : « Le CO est un gaz toxique qui ne se voit pas et ne se sent pas, et qui n'irrite ni les yeux ni les
  voies respiratoires. Rien n'avertit. […] C'est ce qui rend le piège mortel » (la voix du rapport, puis la chute) ;
- ch. 26, l.238 : « Le monoxyde donne mal à la tête, la nausée et le sommeil, et la famille met ça sur le compte de la
  maladie » (presque parlé, sauf « la nausée et le sommeil » et « met ça sur le compte de ») ;
- ce qu'on dirait : « Le monoxyde donne mal à la tête, mal au cœur et envie de dormir, et la famille pense que c'est
  la maladie ou l'inquiétude. »

Le ch. 26 montre aussi l'autre face : sa voix est propre mais plate. « C'est » y tombe à 1,5 pour 1000 mots (5,8 au
ch. 25), les phrases de 6 mots et moins à 3,6 %, et deux phrases voisines sur trois ont presque la même longueur.
Deux règles du skill `ecriture` y poussent : le tableau « Les mots » fait sortir « C'est… qui / que de mise en
relief », et la liste des mots vides chasse « bien », « tout », « encore ». Or « ce qu'on perd, c'est le chiffre »,
« c'est pendant cette minute-là que… » sont la façon même dont on parle. La voix de livre n'est pas le « c'est » :
c'est le pseudo-clivé écrit (« Ce qu'on perd est le chiffre ») et la chute (« C'est le piège complet »).

## 3. Les défauts, du plus grave au moins grave

### 3.1 La langue du rapport médical (gravité haute)

Le ch. 25 recopie le vocabulaire des lignes directrices qu'il a lues : « lésions du froid », « soins définitifs »,
« la conduite », « classer par la clinique », « bornes de référence », « conscience altérée » (6 fois), « station
debout », « victime » (4), « secouriste » (3), « convection », « conduction », « diurétique », « afterdrop »,
« drainage sélectif », « atteinte du plexus vasculaire profond », « déshabillage paradoxal », « nécrose installée »,
« la pratique courante est de », « les données comparatives manquent », « un déclencheur nommé, avec l'acidose,
l'hypocapnie et l'hypoxie ». Le ch. 39 en a une dizaine (« mictions » deux fois, « le jugement thermique »,
« combustion incomplète », « hémoglobine », « souches non protéolytiques », « inhibées », « larves enkystées »,
« drain thermique », « stratifié »). Le ch. 26 n'en garde que « somnolente » (3 fois). Un parent ne dit aucun de ces
mots à son voisin, et le lecteur qui ouvre le livre dans l'urgence doit les traduire.

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.5 | « Les gestes sont identiques au village et au chalet ; le délai jusqu'aux soins définitifs ne l'est pas, et c'est lui seul qui change la conduite, à l'étape 18. » | « Les gestes sont les mêmes à la maison et au chalet. Ce qui change, c'est le temps qu'il faut pour se rendre à l'hôpital, et ça ne change qu'une décision : celle de l'étape 18. » |
| ch. 25, l.61 | « La réponse est plus révélatrice que le frisson : la victime est généralement incapable de se rendre compte de son état. » | « La réponse en dit plus long que le frisson, parce que la personne qui a pris froid se rend rarement compte de son état. » |
| ch. 25, l.72 | « une personne qui frissonne **avec** la conscience altérée se traite comme une modérée, pas comme une légère. » | « Une personne qui frissonne **et** qui a les idées mêlées doit être soignée pour une hypothermie modérée, pas légère. » |
| ch. 25, l.109 | « Après le réchauffement, laisser frissonner sous l'isolant environ 30 minutes avant de permettre la station debout, puis reprendre l'effort progressivement. Se tenir debout rouvre la circulation des jambes et aggrave l'afterdrop. » | « Après le réchauffement, la laisser frissonner dans l'enveloppe environ 30 minutes avant de la laisser se lever, puis la laisser reprendre ses tâches petit à petit. Quand elle se lève, le sang froid des jambes remonte vers le cœur, et sa température baisse encore. » |
| ch. 25, l.326 | « Sous 28 °C, le cœur fibrille facilement, et **le mouvement est un déclencheur nommé**, avec l'acidose, l'hypocapnie et l'hypoxie. » | « Sous 28 °C, le cœur se met facilement à trembler au lieu de battre, et un simple mouvement peut suffire à le déclencher. » (Les trois autres déclencheurs sortent : le lecteur ne peut ni les voir ni rien y faire. À confirmer par l'éditeur.) |
| ch. 39, l.217 | « Le jugement thermique est atteint avant la conscience » | « Il ne se rend plus compte qu'il a froid, même s'il est encore bien réveillé. » |

Autres cas : ch. 25, l.304 « Atteinte du plexus vasculaire profond » (« Les vaisseaux du dessous sont touchés : la
gelure est profonde ») ; ch. 39, l.193 « Nombre de mictions et couleur de l'urine » (« Combien de fois l'enfant fait
pipi, et la couleur de son urine ») ; ch. 26, l.115 « une personne somnolente » (« une personne qui s'endort »).

**Cause.** `.claude/cadre-agents.md`, l.21 : « La source sert à vérifier un fait, jamais à copier une forme. » Le
ch. 25 a été rédigé sur des guides cliniques et en a gardé la langue ; la règle existe, rien ne la contrôle. La
table de la règle 15 du skill `ecriture` et la liste `LIVRESQUE` de `controle.py` ne connaissent aucun de ces mots
(sauf « somnolence »). Et les deux chapitres n'ont pas eu leur refonte.

### 3.2 La maxime, l'antithèse et la chute (gravité haute)

Le paragraphe finit sur une formule qui redit en proverbe ce qu'on vient d'expliquer : « X bat Y », « ce n'est pas X,
c'est Y », « X, pas Y », « la seule … honnête, c'est… ». C'est la marque la plus sûre d'un texte écrit par une IA, et
JP l'a déjà refusée (« fils d'la AI »). Environ 10 au ch. 25, 12 au ch. 39, 2 au ch. 26 ; `controle.py` n'en a vu que
2 (sa regex ne cherche que « Un X qui… ne… plus »).

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.167 | « Ce n'est pas le froid qui tue dans la première minute, c'est la noyade. » | Fondre dans la phrase d'avant : « environ **1 minute** de choc, où la respiration peut s'emballer de 600 à 1 000 % au-dessus de la normale, et c'est pendant cette minute-là que les gens se noient. » |
| ch. 25, l.274 | « C'est le gras qui fait passer l'hiver, pas le filet d'orignal (*Alces americanus*) (ch. 21 et 72). » | « Pour passer l'hiver, il faut manger du gras : le filet d'orignal seul ne suffit pas (ch. 21 et 72). » |
| ch. 25, l.437 | « Grossier et chaud bat ajusté et froid : quatre doigts ensemble se partagent leur chaleur, cinq doigts séparés la perdent chacun par leur propre surface. » | « La mitaine est grossière, mais elle est plus chaude qu'un gant ajusté, parce que les quatre doigts ensemble se réchauffent l'un l'autre ; dans un gant, chaque doigt perd sa chaleur de son côté. » |
| ch. 39, l.48 | « Et il ne se sauve pas seul : la barrière physique bat la consigne verbale, toujours. » | « Et un enfant ne se sauve pas tout seul. Pour le garder loin d'un danger, il faut une barrière ; le lui dire ne suffit pas. » |
| ch. 39, l.141 | « La supervision partagée est la supervision absente : dans les noyades mortelles d'enfants au Québec, il n'y avait pas d'adulte à proximité dans 69 % des cas. Le relais se fait à voix haute, pas par présomption. » | « Dans 69 % des noyades mortelles d'enfants au Québec, il n'y avait pas d'adulte proche. Quand un adulte passe la garde à un autre, il le lui dit à voix haute ; on ne suppose jamais que l'autre surveille. » |
| ch. 39, l.536 | « Et une cinquième, qui n'est pas un objet : ce qu'un enfant a avalé ne se traite pas avec ce qu'il y a dans la maison. Là, ce qui remplace le matériel, c'est la route. » | « Et une cinquième chose : quand un enfant a avalé quelque chose, on ne peut pas le soigner avec ce qu'il y a dans la maison. Il faut prendre la route. » |

Autres cas : ch. 25, l.108 « Une personne qui ne remonte pas en dix minutes n'est pas un échec du traitement » ;
l.214 « Une routine plutôt qu'une consigne » ; l.369 « Une partie se prépare l'automne d'avant ou ne servira jamais » ;
l.431 « C'est l'inverse du réflexe et ça marche » ; l.449 « un problème de survie, pas d'apparence » ; l.266 « non pas
par principe, mais parce que… jamais de l'intérieur ». Ch. 39, l.113 « Ce qui se retient à cet âge-là, ce n'est pas la
consigne, c'est le chemin fait avec le corps » ; l.120 « n'entend pas la phrase, il entend la voix » ; l.150 « la
routine, elle, ne se refait pas, elle se transporte » ; l.179 « change le plan, pas la ration » ; l.348 « C'est le
piège complet » ; l.473 « La seule substitution honnête, c'est de ne pas y aller » ; l.477 « vaut plus que l'objet qui
le sert » ; l.482 « qui ne coûtent rien et qui décident de tout ».

**Cause.** La règle existe (`.claude/cadre-agents.md`, l.99 : « Pas de maxime ni de chute en formule ; pas
d'opposition fabriquée ») mais l'outil ne voit qu'une forme sur cinq. L'habitude d'écriture : conclure un
paragraphe en le résumant, et donner du poids par l'antithèse au lieu de dire le mécanisme.

### 3.3 Le télégraphe : des noms à la place des gestes, des participes en chaîne (gravité haute)

La phrase perd son verbe et son sujet : une suite de noms (« protéger, rembourrer, attelle, aucun frottement »), ou
des participes empilés (« l'enfant assis…, soulevé…, lecture prise… »). Personne ne parle comme ça ; on dit qui fait
quoi. Tout le Matériel des ch. 25 et 39 (12 lignes), les étapes 8, 18 et 21 du ch. 25, les étapes 4, 15 et 17 du
ch. 39, la colonne « Action » des tableaux, la balance et les pics de la section 9 du ch. 39 : une trentaine de
passages. Le ch. 26 n'en a presque plus.

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.47 | « **Bâche de plastique, 2 × 3 m** — pare-vapeur : n'isole rien, garde l'isolant sec. À défaut, sacs à ordures fendus. » | « **Bâche de plastique, 2 × 3 m** : elle n'isole pas, mais elle garde l'isolant sec. Sinon, prendre des sacs à ordures fendus. » |
| ch. 25, l.139 | « Dans ce cas : protéger, rembourrer, attelle, aucun frottement, aucune neige » | « Dans ce cas, protéger le membre, le rembourrer et lui mettre une attelle, sans le frotter et sans y mettre de neige » |
| ch. 25, l.149 | « **Après le dégel** : sécher à l'air ou par tamponnement, jamais en frottant ; gaze entre les doigts et les orteils ; pansement sec et volumineux, posé lâche ; membre surélevé ; boire. » | « **Après le dégel** : laisser sécher à l'air ou sécher en tapotant, jamais en frottant ; mettre de la gaze entre les doigts et entre les orteils ; faire un gros pansement sec, sans serrer ; garder le membre surélevé ; faire boire la personne. » |
| ch. 39, l.169 | « **Retirer immédiatement tout ce qui est mouillé.** Bottes, mitaines, bas, pantalon. Séchage à distance du poêle, sur une corde, pas sur la tôle. » | « **Retirer tout de suite ce qui est mouillé** : les bottes, les mitaines, les bas, le pantalon. Les faire sécher sur une corde, loin du poêle, jamais sur la tôle. » |
| ch. 39, l.318 | « Plus court, si un peson à ressort de pêche traîne dans le coffre : l'enfant assis dans un duffel accroché au crochet, soulevé à bout de bras par un adulte, lecture prise quand ça arrête d'osciller. » | « Plus vite, si un peson à ressort de pêche traîne dans le coffre : asseoir l'enfant dans un sac de sport, accrocher le sac au crochet, le soulever à bout de bras et lire le poids quand ça arrête de bouger. » |
| ch. 39, l.452 | « Deux clous de charpente plantés à fond dans deux bouts de manche à balai ou deux morceaux de branche de la grosseur d'un manche, la pointe limée courte et bien acérée, sortant à peine de la longueur d'un ongle. Un cordon noué d'un pic à l'autre, porté au cou par-dessus le manteau » | « Planter à fond un clou de charpente dans chacun de deux bouts de manche à balai, ou de deux morceaux de branche de la même grosseur. Limer la pointe pour qu'elle ne dépasse que de la longueur d'un ongle, et bien l'aiguiser. Nouer un cordon d'un pic à l'autre et le porter au cou, par-dessus le manteau » |

**Cause.** Le skill `ecriture` l'interdit (règle 0 : « pas une liste de noms qui tient lieu d'actions », « pas de
participe en chaîne »), mais deux autres règles poussent dans l'autre sens : le Matériel limité à « une ligne par
item, 15 à 20 mots » (`CLAUDE.md`, « Le gabarit ») et la règle 5 (« Écrire dense ») ; pour tenir dans 15 mots, la
ligne laisse tomber ses verbes. Les colonnes « Action » des tableaux appellent aussi le nom plutôt que la phrase.

### 3.4 La grammaire de l'écrit, qui survit à la refonte (gravité haute)

Ici, aucun mot n'est rare ; c'est la construction qui sent le livre : « ce peut être » (on dit « ça peut être »), le
subjonctif littéraire (« qu'on n'en puisse plus »), le passif et le pronominal de rapport (« ne pourra plus être
rattrapé », « le départ peut se faire »), le nom d'action à la place du verbe (« l'aggravation », « une fraction de
l'effort d'un transport à bras »), le pseudo-clivé écrit (« Ce qu'on perd est le chiffre », 7 fois au ch. 39), le
conditionnel de livre (« Quand la personne mourrait de son sang »), le détour par la tentation (« on est tenté de »).
C'est le défaut qui reste dans le chapitre refait (ch. 26 : une dizaine de cas), et c'est celui que JP entend quand il
dit « la façon que tu écris c'est pas bon ».

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 26, l.45 | « Ce peut être la scie qui tourne encore, l'arbre resté en tension » | « Ça peut être la scie qui tourne encore, l'arbre resté en tension » |
| ch. 26, l.68 | « jusqu'à ce que la personne respire d'elle-même ou qu'on n'en puisse plus. » | « jusqu'à ce que la personne se remette à respirer toute seule, ou qu'on ne soit plus capable de continuer. » |
| ch. 26, l.237 | « Quand on veille quelqu'un, on ferme la maison, on chauffe plus fort et on veut du courant pour la lumière : c'est le moment où on est tenté de rentrer la génératrice dans un bâtiment, un garage ou sous un auvent. Le monoxyde donne mal à la tête, la nausée et le sommeil, et la famille met ça sur le compte de la maladie ou de l'inquiétude. » | « Quand on veille quelqu'un, on ferme la maison, on chauffe plus fort et on veut du courant pour la lumière : c'est à ce moment-là que des gens rentrent la génératrice dans un bâtiment, un garage ou sous un auvent. Le monoxyde donne mal à la tête, mal au cœur et envie de dormir, et la famille pense que c'est la maladie ou l'inquiétude. » |
| ch. 26, l.256 | « Si on attend qu'elle se dégrade, le départ peut se faire de nuit, dans la hâte, sur une route d'hiver, avec les enfants dans l'auto » | « Si on attend que son état empire, on risque de partir de nuit, en vitesse, sur une route d'hiver, avec les enfants dans l'auto » |
| ch. 39, l.413 | « Ce qu'on perd est le chiffre, et le chiffre est ce qui permet de suivre une courbe sur trois jours. Ce qui reste est meilleur qu'on pense » | « Ce qu'on perd, c'est le chiffre, et c'est avec lui qu'on suit la fièvre sur trois jours. Mais ce qui reste vaut plus qu'on pense » |
| ch. 26, l.453 | « Le comportement montre l'aggravation environ une demi-journée plus tard que le thermomètre. » | « Quand ça empire, on le voit dans le comportement environ une demi-journée plus tard qu'au thermomètre. » |

Autres cas : ch. 26, l.253 « dans combien d'heures l'état de la personne ne pourra plus être rattrapé » (« dans
combien d'heures il sera trop tard pour la soigner ») ; l.365 « Quand la personne mourrait de son sang sans lui, le
poser sans hésiter » (« Si, sans garrot, la personne va se vider de son sang, le poser sans hésiter ») ; l.404 « ça
demande une fraction de l'effort d'un transport à bras » (« ça demande beaucoup moins d'effort que de la porter à
bras ») ; l.224 « Un chiffre seul apprend peu » (« Un seul chiffre ne dit pas grand-chose ») ; l.53 « on compte la
route et la surveillance à partir d'elle » ; ch. 39, l.326, l.390, l.426 « Ce qu'on perd est… ».

**Cause.** La règle 15 du skill `ecriture` et sa table travaillent au mot ; `LIVRESQUE` est une liste de mots, et sa
regex de « sommeil » ne cherche que « avoir sommeil ». Rien ne vise la construction. La règle 12 interdit pourtant
« on est tenté de » (skill `ecriture`, l.114), et le ch. 26 l'a gardé : le script ne le cherche pas. Le tableau « Les
mots » (« C'est… qui / que de mise en relief » sort) pousse vers le pseudo-clivé écrit (« Ce qu'on perd est… ») au
lieu du clivé parlé (« Ce qu'on perd, c'est… »).

### 3.5 La chose qui agit, parle ou juge (gravité moyenne)

La matière, le corps ou un objet devient le sujet d'un verbe d'homme : le corps « tient un bilan », la couleur
« ment », la corde « parle », la mitaine « lit », la glace « livre », le poids « commande », la pièce « refuse »,
la peau « signale ». Une douzaine de cas dans le lot (ch. 25 : 4 ; ch. 39 : 8 ; ch. 26 : aucun qui accroche).

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.43 | « Le corps tient un bilan : ce que le métabolisme produit, moins ce que le froid soutire par le vent, le contact, l'humidité et le souffle. » | « Le corps fait de la chaleur, et il en perd par le vent, par ce qu'il touche, par l'humidité et par le souffle. » |
| ch. 25, l.395 | « parce que la peau engourdie ne signale pas la brûlure » | « parce que la personne ne sent pas la brûlure sur une peau engourdie » |
| ch. 39, l.401 | « Ce que ça vaut : la couleur ment dans les deux sens » | « On ne peut pas se fier à la couleur, ni dans un sens ni dans l'autre » |
| ch. 39, l.489 | « la corde de guidage parle si on la fait parler : un nœud pour le bûcher, deux pour la bécosse, trois pour la porte du chalet. Une mitaine ne lit rien d'autre que des nœuds. » | « Sur la corde de guidage, on fait des nœuds qu'on peut compter avec la mitaine : un nœud pour le bûcher, deux pour la bécosse, trois pour la porte du chalet. » |
| ch. 39, l.375 | « et la glace livre le liquide au rythme le plus lent possible, qui est justement celui qu'un estomac irrité tolère. » | « La glace fond lentement dans la bouche, et un estomac irrité garde mieux ce qui arrive lentement. » |
| ch. 39, l.332 | « C'est le prix, et il se paie en bois : un poêle tire son air de la pièce, et une pièce bien calfeutrée finit par lui en refuser » | « Ça coûte du bois, mais il le faut : un poêle prend son air dans la pièce, et dans une pièce trop bien calfeutrée, il finit par en manquer » |

Autres cas : ch. 25, l.117 « c'est précisément ce qui laisse la fenêtre ouverte » ; ch. 39, l.300 « Le poids d'un
enfant commande tout le reste » ; l.84 « la cellule voit encore la fumée ».

**Cause.** La règle 7 du skill `ecriture` (« La voix active, un sujet concret. "Le monoxyde endort" ») met la chose en
sujet ; le cadre (l.100) et le script ne visent que les verbes de l'esprit (savoir, vouloir, attendre, pardonner).
« Ment », « parle », « lit », « livre », « commande », « refuse » passent.

### 3.6 Les mots de livre et d'administration (gravité moyenne)

Des mots corrects qu'on n'entend jamais au garage : « à défaut » (4), « assurer l'eau », « la maisonnée » (2),
« l'épisode » (2), « en deçà », « au-delà », « la subsistance repose sur », « les marges alimentaires », « le
mangeur », « ingérée », « une éclosion », « par présomption », « aucun substitut », « le repli » (3), « comportemental »,
« qui ne souffrent pas d'exception », « étalon », « un pis-aller », « trancher », « au jugé », « révélatrice »,
« l'issue », « généralement », « progressivement », « immédiatement » (6 au ch. 39). Une trentaine dans les ch. 25 et
39, presque rien au ch. 26.

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 39, l.23 | « la décision de rester est prise (ch. 2) et que la maisonnée compte des enfants d'âge préscolaire ou de première année ; » […] « l'épisode dépasse 72 heures. En deçà, l'improvisation passe ; au-delà, la routine cesse d'être une question de confort et devient une question de sécurité » […] « la subsistance repose sur le gibier, le poisson et l'eau du lac plutôt que sur l'épicerie. Les marges alimentaires se resserrent quand le mangeur pèse 20 kg ; » | En titres de situation (règle 13) : « On reste, avec de jeunes enfants (ch. 2) », « Ça dure plus de 72 heures », « On vit du gibier, du poisson et de l'eau du lac ». Si la raison reste ailleurs : « Avant 72 heures, on peut improviser ; après, la routine devient une question de sécurité. Avec un enfant de 20 kg, on a moins de marge sur la nourriture. » |
| ch. 39, l.128 | « **Assurer l'eau.** » | « **Prévoir assez d'eau.** » |
| ch. 39, l.175 | « L'eau du lavage n'a pas besoin d'être bouillie tant qu'elle n'est pas ingérée. Pendant une éclosion, voir ch. 30. » | « L'eau pour se laver les mains n'a pas besoin d'être bouillie, tant qu'on ne la boit pas. Si une maladie se met à passer d'une personne à l'autre : ch. 30. » |
| ch. 39, l.325 | « Aucun substitut n'existe : ni une flamme témoin, ni une plante, ni la vigilance, ni le nez de personne. Ce qu'on perd est l'unique avertissement qui arrive *avant* les symptômes. Le repli est entièrement comportemental et tient à cinq règles qui ne souffrent pas d'exception : » | « Rien ne le remplace : ni une flamme témoin, ni une plante, ni l'attention qu'on y porte, ni le nez de personne. On perd le seul avertissement qui arrive *avant* les symptômes. Il reste cinq règles, à suivre sans exception : » |
| ch. 25, l.214 | « Par grand froid, une rentrée forcée à intervalle fixe, décidé d'avance et plus court que celui des adultes, vaut mieux qu'une surveillance au jugé : personne n'a à trancher au moment où tout le monde a froid et hâte de finir. » | « Par grand froid, il vaut mieux faire rentrer les enfants à heure fixe, décidée d'avance et plus souvent que les adultes, que de les surveiller à l'œil : comme ça, personne n'a à décider quand tout le monde a froid et a hâte de finir. » |
| ch. 25, l.195 | « Ce qui décide de l'issue, c'est qu'il ne reprenne pas l'eau » | « Pour que le pied guérisse, il ne doit plus jamais se mouiller » |

**Cause.** La règle 15 (skill `ecriture`) donne une table de 16 lignes ; `LIVRESQUE` en a une quarantaine. Ni l'une ni
l'autre ne connaît ces mots : la table a été bâtie sur les pages des dangers et le tome 1, pas sur le registre
administratif ou d'essai (« maisonnée », « repli », « substitut », « présomption »).

### 3.7 L'auteur qui commente son livre (gravité moyenne)

La phrase parle du livre, du chapitre ou du lecteur au lieu de parler du geste : 5 fois au ch. 25, 9 au ch. 39, 1 au
ch. 26. C'est la voix du rédacteur qui se regarde écrire.

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.16 et l.28 | « **C'est ici qu'il faut ouvrir le livre quand :** » ; « **C'est le mauvais chapitre quand :** » | *(rien)* : le titre de la section suffit, et la liste « mauvais chapitre » sort (gabarit). |
| ch. 39, l.159 | « Seuils du livre, plus stricts que ceux des adultes : à -15 °C ou moins, sorties écourtées ; à -27 °C ou moins, refroidissement éolien compris, les enfants ne sortent pas. » | « Pour les enfants, les limites sont plus basses que pour les adultes : à -15 °C ou moins, on raccourcit les sorties ; à -27 °C ou moins, en comptant le refroidissement éolien, les enfants ne sortent pas. » |
| ch. 39, l.206 | « Dans ce chapitre, «échec » ne veut pas dire jeter un aliment. Ça veut dire que le plan de rester, à la maison comme au chalet, vient de cesser d'être le bon, ou qu'il faut agir dans la minute. » | *(rien)* |
| ch. 39, l.408 | « C'est la deuxième chose du chapitre qui ne se remplace pas. » | *(rien)* |
| ch. 25, l.465 | « Le détecteur de CO : rien ne le sent, et tout ce chapitre envoie le lecteur allumer des choses dans un espace fermé. » | « Le détecteur de CO : rien d'autre ne sent le monoxyde, et pour réchauffer quelqu'un, on allume du feu dans un espace fermé. » |
| ch. 39, l.525 | « C'est un des rares cas du livre où on part (ch. 2), et où on part tout de suite plutôt que d'attendre de voir, parce que la brûlure d'une pile se fait pendant que l'enfant a l'air correct. » | « Il faut partir tout de suite (ch. 2), sans attendre de voir, parce que la pile brûle pendant que l'enfant a l'air correct. » |

Autres cas : ch. 39, l.36 « Ce chapitre suppose des enfants qui… » ; l.296 « Ce qu'on perd est dit chaque fois ».

**Cause.** Le skill `ecriture` l'interdit (tableau « Les phrases », première ligne : « La phrase qui parle du livre,
du chapitre, de la page »). L'ancien gabarit demandait « C'est le bon chapitre quand » et « C'est le mauvais chapitre
quand » (skill `ecriture`, l.328, ligne retirée le 15 octobre) ; les deux chapitres n'ont pas été repris depuis.

### 3.8 La notation savante : noms latins, flèches et « § », mots anglais (gravité basse)

Noms latins : 4 au ch. 25, 9 au ch. 39 (dont *Francisella tularensis*). « → §9 » : 2 au ch. 25, 5 au ch. 39. Mots
anglais ou familiers qui sortent du registre : « afterdrop » (ch. 25, l.112), « fait la job » (ch. 25, l.100),
« duffel » (ch. 39, l.309 et l.318). Le lecteur ne dit ni « *Picea mariana* » ni « § ».

| fichier, ligne | ce que le livre dit | ce qu'on dirait |
| --- | --- | --- |
| ch. 25, l.277 | « Pour la boisson chaude, si on infuse des aiguilles de conifère : **sapin baumier (*Abies balsamea*) ou épinette noire (*Picea mariana*), jamais le cèdre (thuya occidental, *Thuja occidentalis*)**. Il contient de la thuyone, toxique (ch. 20 et 33). » | « Pour une tisane d'aiguilles, prendre du **sapin baumier ou de l'épinette noire, jamais du cèdre** : le cèdre contient de la thuyone, qui est toxique (ch. 20 et 33). » |
| ch. 39, l.261 | « **Tularémie — lièvre d'Amérique (*Lepus americanus*).** La bactérie *Francisella tularensis* passe par une coupure, par la muqueuse de l'œil ou par inhalation pendant le dépouillement. » | « **Tularémie et lièvre.** La bactérie de la tularémie entre par une coupure, par l'œil ou par l'air qu'on respire pendant qu'on dépouille le lièvre. » |
| ch. 39, l.61 | « **Pèse-personne** — médicament, ration, réhydratation : tout se dose au poids de l'enfant (→ §9 : balance à perche). » | « **Pèse-personne** : la dose d'un médicament, la ration et la solution de réhydratation se calculent selon le poids de l'enfant (sans pèse-personne : section 9, la balance à perche). » |
| ch. 25, l.99 | « Si rien d'autre, le corps d'une autre personne dans le sac fait la job, en sachant que ça réchauffe à peu près au rythme du frisson seul et que ça immobilise un secouriste. » | « Si on n'a rien d'autre, une autre personne peut se coucher dans le sac avec elle. Ça réchauffe à peu près aussi vite que le frisson tout seul, et la personne qui se couche ne peut plus aider les autres. » |

**Cause.** `.claude/cadre-agents.md`, l.138 à 140 : « pas de nom latin, pas de notation que le lecteur n'emploie
pas », « "section N", jamais "§" ». Les chapitres n'ont pas eu leur refonte ; `controle.py` compte les « § » mais
pas les noms latins ni les mots anglais.

## 4. Ce qui marche (modèles)

1. **ch. 26, l.216** : « Ces signes ne permettent pas de trouver la maladie ; on s'en sert pour voir si la personne va
   mieux ou plus mal, et ça se voit seulement sur une série écrite : après une grosse peur, on se souvient du pire
   moment et on oublie comment on y est arrivé. » Pourquoi : « on », « ça », des « et » qui lient ; la raison est une
   chose que tout le monde a vécue (après une grosse peur, on se souvient du pire moment), pas un principe. Une
   phrase longue qui se dit d'un souffle.
2. **ch. 26, l.83** : « Chaque fois qu'on soulève la main pour regarder, on défait le caillot qui commençait à se
   former. Appuyer de tout son poids, les bras tendus, pendant au moins 5 minutes pleines à la montre avant de
   regarder : sous le stress, on compte trop vite. » Pourquoi : la raison nomme le geste que le lecteur est sur le
   point de faire (soulever pour regarder) ; « sous le stress, on compte trop vite » se dit tel quel au voisin.
3. **ch. 26, l.96 et l.99** : « pendant qu'on attend de voir si l'appui finit par marcher, la personne continue de
   perdre ce sang. » ; « Un garrot bien posé fait très mal : la douleur ne veut pas dire qu'il est mal posé. »
   Pourquoi : « attendre de voir si ça finit par marcher » est la phrase même qu'on se dit ; le fait qui retourne le
   réflexe est dit à plat, sans « attention » ni formule. (`controle.py` signale « la douleur ne veut » : faux
   positif, « vouloir dire » est une expression.)
4. **ch. 25, l.208** : « **Ne pas leur demander s'ils ont froid : les vérifier.** Un enfant absorbé par son jeu ne
   demande pas à rentrer, et un enfant qui refroidit devient tranquille. Toucher les joues, les oreilles, les doigts,
   et regarder s'il joue encore. » Pourquoi : ce que le parent voit, avec les mots de la maison ; le fait qui surprend
   (l'enfant qui refroidit devient tranquille) sans jargon, au milieu d'un chapitre qui en est plein.
5. **ch. 39, l.346** : « Il a l'air fatigué, mou, de mauvais caractère ; il chigne, il ne veut plus jouer, il veut se
   recoucher. » Pourquoi : les mots d'un parent (« mou », « il chigne », « se recoucher »), trois verbes au présent
   qui décrivent ce qu'on voit. La phrase suivante est presque juste (« conclut au caractère » : on dirait « pense
   que c'est son caractère ») ; la troisième (« C'est le piège complet ») sort.

Aussi, ch. 26, l.382 (l'écharpe) : « comme rien ne passe par-dessus la tête, on ne bouge pas l'épaule blessée » ;
le « comme » de la parole, que le livre emploie trop peu.

## 5. Ce que ça dit pour le skill et pour un auditeur de la voix

- **Juger la construction, pas seulement le mot.** La règle 15 et `LIVRESQUE` ne voient que des mots. Un auditeur
  de la voix devrait chercher, en plus : « ce peut être » ; le subjonctif littéraire (« qu'on n'en puisse ») ; « on
  est tenté de » ; le pseudo-clivé écrit (« Ce qu'on perd est », « Ce qui reste est », « Ce qui décide de l'issue ») ;
  le nom d'action sujet (« le départ peut se faire », « l'aggravation », « le relais se fait ») ; « sommeil » sous
  toutes ses formes ; les antithèses de chute (« X bat Y », « ce n'est pas X, c'est Y », « …, pas Y. » en fin de
  paragraphe, « la seule X honnête ») ; les verbes d'homme après une chose (« ment », « parle », « lit », « livre »,
  « commande », « refuse », « signale ») ; les noms latins entre astérisques ; « → » et « § » ; une liste du
  vocabulaire clinique (« conscience altérée », « soins définitifs », « victime », « secouriste », « station
  debout », « mictions », « drainage », « atteinte »).
- **Ne pas chasser les marques de la parole.** « C'est », « ça », « bien », « tout », « comme », « parce que » sont
  les mots les plus fréquents du français qu'on parle. La ligne « C'est… qui / que de mise en relief » du tableau
  « Les mots » devrait viser le relief qui décore (« C'est la cendre qui tient le mieux ») et garder le clivé parlé
  (« ce qu'on perd, c'est le chiffre ») ; le ch. 26 montre ce qui arrive quand on le chasse : une voix propre, mais
  plate.
- **Le test à voix haute ne suffit pas à celui qui a écrit.** Les trois chapitres ont passé une relecture ; le ch. 26
  a passé la chaîne complète et garde « le sommeil » et « on est tenté de ». L'auditeur de la voix ne doit pas être
  le rédacteur, et il a besoin de la liste ci-dessus sous les yeux.

## 6. Liste de contrôle (ma partie du cadre)

Pour tout agent
- [x] `CLAUDE.md` chargé et suivi ; les règles « L'écriture » appliquées aux réécritures.
- [x] Skill `ecriture` lu au complet, avec ses tableaux ; section `LIVRESQUE` de `controle.py` lue.
- [x] Plan de match, PAUSE du 15 octobre : un seul point touche le ch. 25 (le boire en hypothermie), hors de mon
  regard.
- [x] Règle 1 : aucun chiffre ni fait neuf dans les réécritures ; deux coupes signalées (les trois déclencheurs du
  ch. 25, l.326 ; « d'âge préscolaire » remplacé par « de jeunes enfants »).
- [x] Rien de commité ; seul ce fichier est écrit.
- [x] Lecture limitée au lot, aux règles et aux mesures ; sorties coupées ; aucune image ouverte.

La phrase (vérifiée sur mes réécritures ; l'état du lot est dit en regard)
- [x] Règle 0, lue à voix haute : chaque réécriture a son verbe et son sujet. Lot : non aux ch. 25 et 39 (3.3).
- [x] Pas de loi en formule, pas de « d'où ». Lot : quelques-unes au ch. 25 (l.43).
- [x] Pas de maxime, de chute ni d'opposition fabriquée dans les réécritures. Lot : non, 3.2.
- [x] Pas de chose qui pense, ment ou parle. Lot : non, 3.5.
- [x] Consigne jamais au pronominal ni au présent qui décrit dans les réécritures. Lot : hors de mon regard (audit
  « consigne »), relevé seulement quand c'est une tournure de livre (3.4).
- [x] Le mot qu'on dit (règle 15) : réécritures en mots de tous les jours, en français correct, sans joual
  (« fait la job » et « duffel » sortent ; « bécosse » et « chigne » restent, mots du Québec). Lot : non, 3.1, 3.4,
  3.6.
- [x] On nomme la chose au lieu du possessif qui oblige à chercher.
- [x] Pas de mot de métier sans besoin, pas de nom latin, pas de « § » dans les réécritures. Lot : non, 3.8.
- [x] Aucun tiret dans les réécritures (`controle.py` : 0). Lot : 49 au ch. 25, 42 au ch. 39, 2 au ch. 26.
- [x] Titres de situation (règle 13) proposés pour la section 2 du ch. 39.
- [x] Passage signalé jugé d'abord sur son existence : cinq phrases proposées *(rien)* en 3.7.
- [ ] Inventaire des faits et répétition : hors de mon regard.

La langue
- [x] Réécritures passées par `langue.py` (LanguageTool présent) : 2 avis, jugés faux positifs.
- [x] Une seule série d'alternatives par phrase dans les réécritures.
- [x] Ni joual ni anglicisme dans les réécritures.
