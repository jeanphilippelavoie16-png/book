---
name: ecriture
description: Écrire, réécrire ou resserrer le texte du Manuel du Nord pour qu'il se dise à voix haute, qu'il soit informatif et qu'il ait le tempo du paragraphe du monoxyde que JP a adoré. Utilise ce skill dès qu'on écrit ou retouche un chapitre, une page des dangers, une étape, une série orange, un logigramme, une ligne de matériel, une légende ou une note ; dès qu'on lance une passe de style sur un ou plusieurs chapitres ; et chaque fois que JP dit « trop AI », « fils d'la AI », « c'est inutile », « c'est long pour rien », « c'est poétique », « faut que ça soit informatif », « le tempo est pas bon », « personne parle comme ça », « qui qui dit ça » ou « c'est pas humain », et quand il se plaint des tirets. Il porte le paragraphe, la phrase et le mot, en quatorze principes numérotés de P1 à P14. Le fond (chiffres, sources, sécurité) est dans CLAUDE.md, la forme du chapitre dans gabarit-chapitre.md, et les fautes dans le skill langue.
---

# L'écriture du Manuel du Nord

Trois phrases de JP portent tout ce skill.

- « Faut que ça soit informatif, tout le livre. » (14 et 15 octobre 2026)
- « c'est pas juste les logigrammes, c'est la façon de dire les choses. » (15 octobre 2026)
- « le tempo du paragraphe est pas bon pi c'est vrai dans toute le livre » (28 octobre 2026)

## Le diapason

JP a adoré ce paragraphe de la page du monoxyde (« j'adore celui-là, comment il est écrit », 28 octobre 2026). Tout
ce qu'on écrit doit sonner comme lui.

> Le poêle, le barbecue, le réchaud, le fanal et les moteurs font du monoxyde de carbone. Le poêle en dégage plus la
> nuit, quand on ferme l'entrée d'air presque au complet. Ce gaz ne se voit pas et n'a pas d'odeur. Il prend la place
> de l'oxygène dans le sang, alors on a envie de dormir. On ne se doute de rien, et on s'endort avant d'avoir pensé à
> sortir. Ça ne sert à rien de se coucher par terre comme dans la fumée, parce que le monoxyde remplit toute la pièce,
> jusqu'au plancher.

Chaque phrase porte un fait, les longueurs changent avec ce qu'on dit, les liens sont des mots qu'on dit, et la fin
corrige un réflexe. Un principe qui rejette ce paragraphe est faux, et c'est le principe qu'on corrige.

## Le lecteur

Il sait souder et abattre un orignal, mais il n'a jamais salé une cuisse. Il lit à la lampe frontale, souvent à voix
haute pour les autres, et il fait ce qu'il lit, alors une phrase comprise à l'envers est pire qu'une phrase obscure.
Quand deux règles tirent en sens contraire, l'ordre de `CLAUDE.md` (« L'écriture ») tranche, et les listes de mots
passent en dernier.

## Deux sortes de texte

On n'écrit pas une étape comme une explication. On consulte l'étape, la série orange, le logigramme, le Matériel et
les tableaux les mains occupées, alors chaque phrase y dit un geste, claire toute seule. On lit d'un trait les pages
des dangers, le mécanisme dans une étape, la prose des sections 1, 2 et 7 et les notes « En plus », alors leurs faits
liés restent ensemble, avec leurs mots de lien. Sous chaque principe, l'italique dit pour quelle sorte il vaut, qui le
contrôle et d'où il vient.

## Les principes

### P1. On le dit à voix haute, et on juge le paragraphe entier

On écrit chaque phrase comme on l'expliquerait à quelqu'un debout à côté de soi. Puis on lit le paragraphe entier à
voix haute, d'un trait, parce que des phrases correctes une à une peuvent faire un paragraphe sans tempo, comme dans
l'épreuve du monoxyde. On relit aussi chaque consigne en cherchant comment on pourrait la comprendre à l'envers : un
complément accroché au mauvais mot, un « ne… jamais que », un chiffre lu sans sa condition ou sans sa borne. Même une
case de logigramme fait une phrase (« Il a un endroit où aller ? », pas « Refus, il a où aller »).

*Les deux sortes. A1, A2. JP, 15 et 28 octobre.*

### P2. Le passage doit exister, à sa place, une seule fois

Avant de polir un passage, on se demande s'il apprend quelque chose à la personne qui va agir, s'il parle du sujet du
chapitre et s'il dit chaque fait une seule fois. Ailleurs, un renvoi court suffit. Pour condenser, on coupe des faits
entiers, jamais un « parce que » ni un « mais », parce qu'on écrit utile, pas dense (décision 4). Les neuf rappels de
sécurité restent dans chaque étape qui s'en sert. Une phrase refaite garde chaque fait, chiffre, repère et renvoi de
l'ancienne, et le mécanisme qu'on ajoute à une étape dit pourquoi, sans redire le geste.

Le paragraphe « On est tenté de mettre la génératrice au garage… » est sorti au complet, parce qu'il ne menait à aucun
geste.

*Les deux sortes. L'éditeur, `controle.py --avant`, A2. JP, 15 et 28 octobre.*

### P3. Le pourquoi reste

On dit pourquoi on fait un geste quand la raison montre un risque qu'on ne verrait pas, avec son mot (parce que,
sinon, c'est pour ça que). Dans une page de danger, le mécanisme est ce qu'on explique. On coupe le pourquoi seulement
quand le lecteur le sait déjà.

« Vidanger avant que la maison descende sous 5 °C : un tuyau plein fend en gelant » devient « Vidanger la plomberie
avant qu'il fasse moins de 5 °C dans la maison, parce qu'un tuyau plein d'eau fend quand l'eau gèle dedans ».

*Les deux sortes. A3, A2. JP, 16 octobre (« explique pourquoi »).*

### P4. Le paragraphe suit ce qui arrive à la personne, et chaque phrase reprend la précédente

On range les faits dans l'ordre où ils arrivent (d'où vient le danger, ce qu'il fait au corps, ce qu'on remarque, ce
qu'on fait), alors une page de danger commence par d'où il vient. Chaque phrase part de ce qu'on vient de dire et finit
sur le neuf, et le verbe passe avant la liste ou la parenthèse. Quand un pronom ou un « son » peut répondre à deux
noms, on redit le nom, comme « Ce gaz » dans le diapason. Un paragraphe « Ce qui arrive » porte un seul danger.

*La prose. `tempo.py`, A1. JP, 16 octobre ; décision 5.*

### P5. On dit le lien avec un mot

Quand deux faits ont un rapport (une cause, une suite, une condition, un contraste), on le dit avec le mot qu'on
emploierait en parlant (parce que, comme, donc, alors, c'est pour ça que, quand, si, sinon, mais, puis). Les deux faits
restent ensemble, dans la même phrase ou dans la suivante, qui commence par ce mot. Le mot vient seulement quand le
rapport existe, et les chevilles écrites (en effet, d'ailleurs, ainsi) restent dehors.

« On ne voit pas si un fil est sous tension : on fait toujours comme s'il l'était » devient « On ne voit pas si un fil
est sous tension, alors il faut toujours faire comme s'il l'était ».

*Les deux sortes. `tempo.py`, A1. Lanson, sur la phrase sans lien, « du gravier sans ciment ».*

### P6. Le deux-points annonce, le point-virgule lie, et on n'écrit aucun tiret

Le deux-points annonce une liste, un exemple, une autre façon, une question ou ce que fait une ligne de Matériel. Il
ne remplace ni « alors » ni « parce que », parce qu'à voix haute on l'entend comme un point. Dans la prose, on en met
un par paragraphe au plus. Le point-virgule lie deux phrases qui vont ensemble, et la parenthèse porte un renvoi, une
unité ou l'impérial, jamais un fait qui change le geste. On n'écrit aucun tiret dans une phrase, ni long ni moyen ; à
sa place, on met le mot du lien, sinon la virgule ou le point.

L'épreuve du monoxyde avait deux deux-points, qui cachaient « alors » et « parce que ».

*Les deux sortes. `controle.py` (le tiret bloque), `tempo.py`, A1. JP, 15 octobre.*

### P7. Les longueurs varient avec ce qu'on dit, et la phrase finit sur ce qui compte

Un ordre ou un signe tient en quelques mots (« Sortir tout le monde. »), et une explication avec sa cause prend une
phrase plus longue, liée. Deux phrases voisines n'ont pas le même moule. Chaque phrase finit sur ce qui compte, et le
fait grave ne reste jamais dans une rallonge après « , et ». On ne fabrique pas la variation, parce qu'une phrase
courte faite pour frapper devient une maxime.

Au ch. 3, la ligne du poisson fumé finissait sur la température d'un frigo en panne. Refaite, elle finit sur les 3 °C
où le botulisme fait sa toxine.

*Surtout la prose. `tempo.py`, A1. JP, 28 octobre (le texte de l'éditeur).*

### P8. On sait qui fait le geste, et le geste est un verbe

On nomme le sujet (on, les gens qui, la personne qui, jamais « ceux qui » en tête), puis on met le verbe, ce qu'on
fait, et où. Dans la prose aussi, la personne qui fait le travail est le sujet, pas l'outil, le lieu ou la méthode. Une
consigne a la forme d'une consigne (il faut, on doit, l'infinitif dans une étape), même au milieu d'une explication,
jamais celle du présent qui décrit. La condition est un « si » ou un « quand », pas un participe en tête (« Porte
fermée, »), et le geste est un verbe, pas un nom (« à chaque ouverture »). Jamais de pronominal quand quelqu'un fait le
geste, mais le « se » reste quand la chose le fait toute seule (« le puisard se remplit ») ou quand il dit ce qu'elle
est (« Ce gaz ne se voit pas »).

« Ceux qui étaient dehors laissent à la porte la couche du dessus et les chaussures » devient « Les gens qui étaient à
l'extérieur doivent laisser leurs vêtements du dessus et leurs chaussures à la porte ».

*Les deux sortes. `controle.py`, A1, A3. JP, 15 et 16 octobre (« on doit le cuire, pas il se cuit »).*

### P9. L'étape : un geste, dans l'ordre du temps, la condition avant, le signe après

Une étape porte un geste, ou deux gestes liés par « puis », dans l'ordre où on les fait. Le but, le lieu, la condition
et le pictogramme viennent avant le geste ; le signe qu'on voit quand c'est fait (jusqu'à ce que…) et la raison
viennent après. L'exception a sa propre ligne, avant le geste qu'elle change, avec l'autre branche. Plusieurs gestes
font des sous-étapes, chacune avec son repère de planche, dans l'ordre des repères. Un choix dit comment choisir. Après
un signe grave ou une condition, l'étape dit le geste qui suit, pris dans le chapitre avec un renvoi court, sinon
`[À VÉRIFIER]`. Dans la série orange, tout le détail reste, mais le geste passe avant son pourquoi, et ce qui ne sert
pas au geste sort de l'orange.

« Partir dès le premier soir si quelqu'un dépend d'un appareil médical électrique, sauf si… » devient « Quand quelqu'un
dépend d'un appareil médical électrique, rester seulement si on l'a fait marcher avant la panne sur une batterie d'auto
et un onduleur. Sinon, partir dès le premier soir. »

*Le texte qu'on consulte. A3, A2. JP, 15 octobre (« TOUT EST NOUVEAU ») ; décision 6.*

### P10. Le mot qu'on dit, en français correct

Chaque mot est celui qu'un Québécois dirait à son voisin, en français correct, et la façon de dire compte autant que
le mot. Le parlé correct entre (ça, c'est pour ça que, on a envie de dormir), mais pas le joual (pis, pu, y'a), et le
skill `langue` trace la frontière. Le mot de métier reste quand le geste en a besoin, et on l'explique la première
fois. La fiche officielle sert à vérifier un fait, pas à donner la phrase, alors on n'en garde ni citation, ni « vous »,
ni formule. Les noms latins sortent.

« S'il n'y a aucun signe de détérioration » devient « si l'aliment ne sent pas mauvais et n'a pas l'air gâté ».

*Les deux sortes. `controle.py`, A1. JP, 28 octobre (« qui qui dit ça dans vrai vie ») ; décisions 7 et 11.*

### P11. Le même mot pour la même chose

Un objet garde son nom d'un bout à l'autre du chapitre, un geste garde son verbe, et un mot y garde un seul sens.
« Ce gaz » n'est pas un synonyme, parce qu'il reprend le nom qu'on vient de dire. On chasse l'idée redite, pas le mot
exact, sauf dans un texte qui présente quelqu'un.

Au ch. 1, l'horloge du corps avait trois noms, et deux lecteurs ont cru à une cinquième horloge.

*Les deux sortes. A1, A2. JP, 15 et 19 octobre.*

### P12. Le fait, pas l'effet

Aucune phrase ne parle du livre, de la page ou de la recherche. On n'écrit ni image, ni petite scène, ni chute, ni
maxime, ni chose qui pense, ni opposition qui n'ajoute pas de fait. On dit en clair le fait caché derrière la formule,
ou on coupe la phrase. Ce fait est celui que la phrase dit, ou que le chapitre dit ailleurs. On garde tout ce qu'elle
affirme et ce qu'elle pousse à faire, sans ajouter de moment, d'ordre ni de cause. Si on ne sait pas ce qu'elle veut
dire, on garde la lecture la plus proche de ses mots, avec `[À VÉRIFIER]`. Un vrai « mais » reste, comme le « pas X »
d'une consigne et l'image qui vient de la main (« Amorcer comme une allumette »).

« Un gilet rangé sous le banc est un objet décoratif » devient « il faut mettre son VFI avant de partir, au lieu de le
laisser sous le banc ».

*Les deux sortes. `controle.py`, A1. JP, 15 et 16 octobre (« fils d'la AI », « paraboles ») ; décision 8.*

### P13. On dit le fait qui surprend comme une correction

Quand le réflexe normal est le mauvais, on nomme ce que les gens croient ou font, on le corrige avec « mais », puis on
dit quoi faire. Ailleurs, et surtout dans une liste, on nomme ce qui marche.

« Un jeune enfant s'intoxique plus vite qu'un adulte, et il a seulement l'air fatigué » cache ce qui surprend un
parent. Avec « mais », on l'entend.

*Surtout la prose. A1, `tempo.py`. JP, 15 octobre ; `CLAUDE.md`, « Le lecteur est un parent compétent ».*

### P14. On explique une notion ou un signe la première fois qu'on en parle

On explique un mot que le livre invente (les quatre horloges, la bascule) dès sa première apparition, en disant
d'abord la chose, puis son nom. Un signe que le lecteur ne sait pas reconnaître va en note de bas de page, avec ce
qu'on voit ou ce qu'on teste. Une chose préparée d'avance, on la décrit là où on s'en sert.

L'épreuve du ch. 1 nommait les quatre horloges trois pages avant de les expliquer.

*Les deux sortes. A2. JP, 28 octobre (« on sait même pas c'est quoi les 4 horloges »).*

## La méthode

1. Lire le chapitre au complet, le gabarit et sa fiche ; un chiffre vient des sources, sinon il porte `[À VÉRIFIER]`.
2. Faire la liste des faits, des chiffres, des repères et des renvois, puis se demander si chaque passage doit
   exister (P2).
3. Ranger les faits dans l'ordre où ils arrivent (P4), ou les gestes dans l'ordre où on les fait (P9).
4. Écrire le paragraphe entier, le lire à voix haute, puis le comparer au diapason.
5. Passer `scripts/controle.py --avant`, qui montre ce qui a disparu, puis `scripts/tempo.py`. Leurs signaux montrent
   un paragraphe à relire, jamais un chiffre à viser.

Un rédacteur relit ce qu'il a voulu écrire, alors les auditeurs le relisent après le vérificateur technique, et
l'éditeur réécrit une seule fois. Quand JP corrige une phrase, ses mots vont dans `plan/decisions-jp.md`, le
paragraphe corrigé dans `references/exemples.md`, et on corrige ici le principe qu'elle touche, jamais par un fragment.

## Les renvois

`references/exemples.md` donne des paragraphes à imiter, `references/mots.md` les listes de mots, et
`references/auditeurs.md` les fiches de A0 à A3. Le skill `langue` corrige les fautes.
