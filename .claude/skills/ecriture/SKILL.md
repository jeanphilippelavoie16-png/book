---
name: ecriture
description: Écrire, réécrire ou resserrer le texte du Manuel du Nord pour qu'on puisse le dire à voix haute, qu'il soit informatif et qu'il ait le tempo du paragraphe du monoxyde que JP a adoré. Utilise ce skill dès qu'on écrit ou retouche un chapitre, une page des dangers, une étape, une série orange, un logigramme, une ligne de matériel, une légende ou une note ; dès qu'on lance une passe de style sur un ou plusieurs chapitres ; et chaque fois que JP dit « trop AI », « fils d'la AI », « c'est inutile », « c'est long pour rien », « c'est poétique », « faut que ça soit informatif », « le tempo est pas bon », « personne parle comme ça », « qui qui dit ça » ou « c'est pas humain », et quand il se plaint des tirets. Il traite du paragraphe, de la phrase et du mot, en quatorze principes numérotés de P1 à P14. Le fond (chiffres, sources, sécurité) est dans CLAUDE.md, la forme du chapitre dans gabarit-chapitre.md, et les fautes dans le skill langue.
---

# L'écriture du Manuel du Nord

## Le diapason

JP a adoré ce paragraphe de la page du monoxyde (28 octobre 2026), et tout ce qu'on écrit doit sonner comme lui.

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone. Le poêle en dégage plus la
> nuit, quand on ferme l'entrée d'air presque au complet. Ce gaz ne se voit pas et n'a pas d'odeur. Il prend la place de
> l'oxygène dans le sang, alors on a envie de dormir. On ne se doute de rien, et on s'endort avant d'avoir pensé à
> sortir. Ça ne sert à rien de se coucher par terre comme dans la fumée, parce que le monoxyde remplit toute la pièce,
> jusqu'au plancher.

Un principe qui rejette ce paragraphe est faux, et c'est le principe qu'on corrige (exemple 1).

## Avant les principes

Quand deux règles tirent en sens contraire, on suit l'ordre de `CLAUDE.md` (« L'écriture »). Le lecteur fait ce qu'il
lit, alors une phrase comprise à l'envers est pire qu'une phrase obscure. « La prose » est le texte qu'on lit d'un
trait. `plan/decisions-jp.md` garde les mots de JP d'où vient chaque principe.

## Les principes

### P1. On le dit à voix haute, et on juge le paragraphe entier

On écrit chaque phrase comme on la dirait à quelqu'un debout à côté de soi. Ensuite, on lit le paragraphe entier à voix
haute, d'un trait, parce que des phrases correctes une à une peuvent faire un paragraphe sans tempo. On cherche aussi
comment on pourrait comprendre une consigne à l'envers : un complément accroché au mauvais mot, un « ne… jamais que »,
ou un chiffre qui n'a pas sa condition ni sa borne. Une case de logigramme aussi fait une phrase.

### P2. Le passage doit exister, à sa place, une seule fois

Avant de polir un passage, on se demande s'il sert à la personne qui va agir, s'il parle du sujet du chapitre et s'il
dit chaque fait une seule fois. Un fait vrai et neuf peut quand même être de trop (« c'est pas toujours nécessaire »,
JP), parce que chaque détail doit servir au geste ou à éviter le danger. On coupe ce que le lecteur sait déjà, les
phrases de la section 8 de `references/mots.md`, le nom qu'il n'aura pas à employer, la description de ce qu'il n'a
pas à reconnaître, le chiffre qui ne change aucune décision et la liste plus longue que ce qui sert (deux exemples
dans la fiche A4 de `references/auditeurs.md`). On dit chaque fait là où il sert, et ailleurs, on met un renvoi
court. Pour condenser, on coupe des faits entiers, jamais un « parce que » ni un « mais » (décision 4).

Ce tri ne touche jamais à ce qui suit, même quand on le trouve long : les neuf rappels de sécurité, le pourquoi qui
change le geste ou qui corrige un réflexe (P3), le signe grave et le geste qui suit, la débrouille de la variante
d'urgence, qui est le cœur du chapitre, et le diapason. Chaque rappel reste dans l'étape qui s'en sert, dit dans sa
phrase, sans la formule du tableau, et le mécanisme complet reste dans la page du danger. Une phrase refaite garde
chaque fait, chiffre, repère, renvoi, note et appel de planche. Quand on coupe une phrase d'ancrage de planche, on
déplace son ancre (`placements-tome-N.json`) en même temps.

### P3. Le pourquoi reste

On dit pourquoi on fait un geste, surtout quand la raison montre un risque qu'on ne verrait pas, et on lie la raison au
geste avec « parce que », « sinon » ou « c'est pour ça que ». Dans une page de danger, le mécanisme est ce qu'on
explique. On coupe le pourquoi seulement quand le lecteur le sait déjà.

### P4. Le paragraphe suit ce qui arrive à la personne, et chaque phrase reprend la précédente

On range les faits dans l'ordre où ils arrivent à la personne : d'où vient le danger, ce qu'il fait au corps, ce qu'on
remarque, puis ce qu'on fait. Une page de danger dit donc d'abord d'où vient le danger (décision 5). Chaque phrase part
de ce qu'on vient de dire et finit sur ce qui est neuf. Une longue liste ou une parenthèse ne sépare pas le verbe de son
sujet ni de son complément, mais une courte liste de noms peut être le sujet, comme dans le diapason. Quand un pronom ou
un possessif peut répondre à deux noms, on redit le nom, même dans une étape (« le robinet de vidange du chauffe-eau »,
pas « son robinet »). Un paragraphe « Ce qui arrive » parle d'un seul danger.

### P5. On dit le lien avec un mot

Quand deux faits ont un rapport, on le dit avec le mot qu'on emploierait en parlant : « parce que », « alors »,
« donc », « mais », « sinon », « quand » ou « puis ». Les deux faits restent ensemble, dans la même phrase ou la
suivante. Le mot vient seulement quand le rapport existe. Les chevilles écrites (« en effet », « d'ailleurs »,
« ainsi ») restent dehors.

### P6. Le deux-points annonce, le point-virgule lie, et on n'écrit aucun tiret

Le deux-points et le tiret ont leur règle ferme dans `CLAUDE.md`. Le deux-points ne remplace ni « alors » ni
« parce que », parce qu'à voix haute on l'entend comme un point. La prose en a un au plus par paragraphe, et une phrase
n'en a jamais deux. Le point-virgule lie deux phrases qui vont ensemble. Dans une énumération, on met « et » ou « ou »
avant le dernier élément. La parenthèse sert pour un renvoi, une unité ou l'impérial, jamais pour un fait qui change le
geste.

### P7. Les longueurs varient avec ce qu'on dit, et la phrase finit sur ce qui compte

Un ordre ou un signe tient en quelques mots (« Sortir tout le monde. »), mais une explication avec sa cause prend une
phrase plus longue, liée. Dans la prose, deux phrases voisines n'ont pas la même forme : les six phrases du diapason
font de 10 à 24 mots, mais aucune n'est bâtie comme sa voisine. On ne fabrique pas la variation, parce qu'une phrase
courte faite pour frapper devient une maxime.

Chaque phrase finit sur ce qui compte. On n'accroche pas un deuxième fait après « , et » au bout d'une phrase qui parle
d'autre chose ; il prend sa phrase (exemple 1). Le « , et » qui mène au fait qui compte reste (« On ne se doute de rien,
et on s'endort avant d'avoir pensé à sortir »).

### P8. On sait qui fait le geste, et le geste est un verbe

On nomme qui fait le geste (« on », « les gens qui »), jamais l'outil ni la méthode, puis on met le verbe et ce qu'on
fait, et à la fin seulement où on le fait (« laisser ses chaussures à la porte »). On dit le geste par un verbe, pas par
un nom (« à chaque ouverture »). Une consigne garde la forme d'une consigne, même au milieu d'une explication :
« il faut », « on doit », ou l'infinitif dans une étape. La condition est un « si », pas un participe en tête.

Le pronominal a sa règle ferme dans `CLAUDE.md` (« on doit le cuire », jamais « il se cuit »).

### P9. L'étape : un geste, dans l'ordre du temps, la condition avant, le signe après

Une étape a un seul geste, ou deux gestes liés par « puis », dans l'ordre où on les fait. Le but, le lieu, la condition
et le pictogramme viennent avant le geste. Après lui viennent le signe qu'on voit quand c'est fait, puis la raison.
L'exception a sa ligne avant le geste qu'elle change, et « Sinon » ouvre l'autre branche (exemple 10). Quand l'exception
est rare et que les autres doivent agir tout de suite, « Sauf… » en tête du geste suffit, et le geste de l'exception va
sur la ligne d'en dessous (exemple 8). Des gestes distincts font des sous-étapes, dans l'ordre des repères de la
planche, mais les petits gestes qui servent un seul but restent dans l'étape, une phrase par geste (exemples 7 et 11).
Quand l'étape laisse un choix, elle dit comment choisir. Après un signe grave, elle dit le geste qui suit, pris dans le
chapitre ou marqué `[À VÉRIFIER]`. La série orange suit `CLAUDE.md` (décision 6).

### P10. Le mot qu'on dit, en français correct

Chaque mot est celui qu'un Québécois dirait à son voisin, en français correct, et la façon de dire compte autant que le
mot. La langue parlée correcte entre, mais pas le joual (`CLAUDE.md`, règle 6). Le mot de métier reste quand le geste en
a besoin, et on l'explique la première fois. Le mot technique juste reste aussi (« en proportion de »). La fiche
officielle sert à vérifier un fait, alors on n'en garde ni citation, ni « vous », ni formule. Les guillemets servent
seulement au mot qu'on dit à voix haute ou qu'on lit sur une étiquette.

### P11. Le même mot pour la même chose

Dans un chapitre, un objet garde le même nom et un geste le même verbe, et un mot n'y a qu'un sens. On évite de redire
une idée, mais on redit le mot exact. Juste après le nom, on peut le reprendre par « ce » et un mot plus général
(« ce gaz »), puis on revient au nom exact (« le monoxyde »). Seul un texte qui présente quelqu'un évite de redire son
nom.

### P12. Le fait, pas l'effet

Aucune phrase ne parle du livre, de la page ou de la recherche. On n'écrit ni image, ni petite scène, ni chute, ni
maxime, ni chose qui pense, ni opposition qui n'ajoute pas de fait. On dit en clair le fait caché derrière la formule,
celui que la phrase dit ou que le chapitre dit ailleurs, sinon on coupe la phrase. On garde tout ce que la phrase
affirme et ce qu'elle pousse à faire, sans ajouter de moment, d'ordre ni de cause. Dans le doute, on garde la lecture la
plus proche des mots de la phrase, avec `[À VÉRIFIER]`. Trois choses restent : le vrai « mais », le « pas X » d'une
consigne et l'image qui vient de la main (« Amorcer comme une allumette »).

### P13. On dit le fait qui surprend comme une correction

Quand le réflexe normal est le mauvais, on nomme ce que les gens croient ou font, puis on le corrige, avec « mais » ou
en disant pourquoi il ne sert à rien. On dit ensuite quoi faire, là ou dans l'étape qui suit. On ne cache pas le fait
qui surprend au bout d'une phrase, derrière un « ne… pas ». Quand il n'y a pas de réflexe à corriger, surtout dans une
liste, on nomme seulement ce qui marche.

### P14. On explique une notion ou un signe la première fois qu'on en parle

On explique un mot que le livre invente (« les quatre horloges », « la bascule ») dès sa première apparition, en disant
d'abord la chose, puis son nom. Un signe que le lecteur ne sait pas reconnaître va en note (`CLAUDE.md`, règles fermes).
Une chose préparée d'avance, on la décrit là où on s'en sert.

## La méthode

1. Lire au complet le chapitre, le gabarit et la fiche du chapitre (`suivi/NN-redaction.md`), puis faire la liste de ce
   que P2 garde et se demander si chaque passage doit exister.
2. Écrire chaque paragraphe en entier, puis le comparer au diapason, à voix haute.
3. Tirer l'ancienne version (`git show HEAD:chapitres/NN-titre.md > AVANT.md`), puis passer `scripts/controle.py
   chapitres/NN-titre.md --avant AVANT.md`, qui montre ce qui a disparu. Passer ensuite `scripts/tempo.py`, dont les
   signaux montrent un paragraphe à relire, jamais un chiffre à viser.

Quand JP corrige un texte, on corrige ici le principe que sa correction touche, au lieu d'ajouter une règle pour ce seul
cas (décision 2). Le paragraphe corrigé va au banc d'essai (`plan/audit-ecriture/banc-essai/`), que chaque nouvelle
version de ce skill doit passer. Il n'entre pas dans `references/exemples.md`, parce que l'agent qui réécrit le banc lit
les exemples.
