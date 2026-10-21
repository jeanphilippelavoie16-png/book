# Édition : Chapitre 15, Se déplacer et le carburant

- **Rôle :** 5, éditeur (n'a ni rédigé ni vérifié le chapitre).
- **Date :** 19 octobre 2026.
- **Texte édité :** `chapitres/15-se-deplacer-et-le-carburant.md` au gabarit final (sept sections et « En plus »), du
  titre à la dernière note, relu phrase par phrase à voix haute. Texte d'avant l'édition : le fichier de travail à
  02 h 01 (copie dans le scratchpad de la session, identique au texte de la refonte et des corrections du vérificateur
  technique notées dans `suivi/15-redaction.md`). Une partie des retouches est déjà dans le commit automatique
  `172f9a2`.
- **Lu avant :** `.claude/cadre-agents.md`, `CLAUDE.md`, `roles.md` (rôle 5), le skill `ecriture` avec ses tableaux,
  `suivi/plan-de-match.md` (PAUSE du 15 octobre), `plan/dangers-inventaire.md` (section 1), `suivi/15-redaction.md`.
- **Aucune source nouvelle, aucun chiffre changé, aucune étape renumérotée** (1 à 48). Ce qui touche un fait est
  signalé plus bas. Une précision reprise mot pour mot de la source déjà au dossier (étape 20).
- **Fins de ligne :** LF avant et après, saut de ligne final gardé.

## controle.py, avant et après

| | Avant | Après |
| --- | --- | --- |
| Mots | 7 733 | 7 748 |
| Tirets | 2 (titre et ligne de tome, forme que lit l'assembleur) | 2 (les mêmes) |
| « § », mots bannis, tournures, maximes, pronominaux, mises en relief | 0 | 0 (une tournure signalée en cours de passe, « Glisser dans le goulot un boyau court », réécrite) |
| Mots vides à juger | 27 | 26 (les « tout de suite », « tout le monde », « tous les 45 m », « encore » restants portent le sens) |
| Redites à juger | 5 | 6, jugées : les 5 d'avant (voir `15-redaction.md`) et « se regarder le visage l'un l'autre » (étape 18, renvoi à l'étape 38) |
| Invariants disparus | | rien |
| Ancres introuvables dans `placements-tome-1.json` | 15-03, 15-05 | 15-02, 15-03, 15-05 (nouvelles ancres plus bas) |

## Ce qui a changé

| Où | Avant | Après | Règle |
| --- | --- | --- | --- |
| Matériel, pics | « qui mordent la glace où les mains glissent (section 7) » | « qu'on plante dans la glace pour se hisser hors de l'eau (pour les faire : section 7) » | Formule « X là où Y » ; les mains qui glissent sont à l'étape 5 |
| Matériel, tarière, pelle, trousse | « percer la glace et lire son épaisseur… ciseau : ch. 111 » ; « dégager… » ; « pour le feu qui suit une chute » | « pour percer… et mesurer… ; pour fabriquer le ciseau : ch. 111 » ; « pour dégager… » ; « pour faire un feu après une chute… ou pour passer une nuit dehors » | Étiquettes ; « ruban » devient « ruban à mesurer » |
| Étape 1 | « puis elle coule : on sort pendant qu'elle flotte » ; « la portière s'ouvre un peu plus facilement » | « avant de couler » (le titre dit déjà d'en sortir tout de suite) ; « on ouvre la portière un peu plus facilement » | Redite ; pronominal |
| Étape 2 | « garder le visage hors de l'eau » (redit le titre) ; « s'appuyer au bord » | coupé ; « s'appuyer au bord de la glace… jusqu'à ce que la respiration se calme » | Redite |
| Étape 4 | « …avant de tirer : l'eau des vêtements alourdit le corps qu'il faut hisser » | « …que l'eau s'égoutte des vêtements avant de tirer » | Conséquence évidente |
| Étapes 5, 6, 7 | « replanter » ; « tirer sur les avant-bras… en même temps que les jambes poussent » ; « Couché, le poids s'étale » ; « Sortir de l'eau le plus de corps possible » | « replanter les pics » ; « se tirer… pendant que les jambes battent » ; « Quand on est couché, le poids s'étale » ; « Sortir le plus possible du corps hors de l'eau » | Participe sans sujet ; règle 0 |
| Étape 8 | « …passe à travers à son tour, et on a deux personnes dans l'eau » ; « et la nouer… pendant que ses mains serrent encore : au bout de quelques minutes dans l'eau, elles ne tiennent plus rien » ; « Si elle entraîne le sauveteur » | « …passe à travers à son tour » ; « et la lui faire nouer… pendant que ses mains ont encore de la force (étape 7) » ; « Si on se sent entraîné » | Conséquence évidente ; redite et chiffre contradictoire (fait signalé 1) ; on sait qui fait le geste |
| Étapes 9, 10 | « Arrivé près du trou » ; « Debout ou en marchant, le sang froid… » ; « Une personne seule n'a pas ce choix : elle marche… » ; « les signes qui disent que c'est grave » | « Une fois près du trou » ; « Quand elle se tient debout ou qu'elle marche… » ; « Une personne seule doit marcher… ou faire un feu » ; « Pour la suite… les signes qui montrent » | Participes sans sujet ; consigne au présent de constat ; chose qui parle |
| Étapes 13 à 18 | « à l'air tout de suite » ; « la lumière, le chauffage et la radio à tour de rôle » ; « On la quitte seulement pour un bâtiment » ; « Regrouper tout le monde…, avec tuques et mitaines » ; « s'installer pour la nuit…, avec un feu et un abri, et y attendre » | « dehors tout de suite » ; « faire marcher la lumière… » ; « La quitter seulement pour aller à un bâtiment » ; « Faire mettre à chacun sa tuque et ses mitaines, et regrouper… » ; « faire un abri et un feu… et y passer la nuit » | Noms sans verbe ; consigne au présent |
| Étape 19 | « **Compter les usages avant les litres.** » ; « son carburant » | « **Faire la liste des moteurs avant de compter les litres.** Y mettre ceux de la maison et du chalet : … » ; « le carburant de chaque machine » | Formule ; possessif qui oblige à chercher |
| Étape 20 | « l'hiver et chargé » ; « de 12 à 28 % dès 7 °C » | « l'hiver, la machine chargée » ; « quand la température passe de 24 à 7 °C, … de 12 à 28 % » | Participe ; « dès 7 °C » se lisait « à partir de 7 °C » (fait signalé 2) |
| Étapes 21 à 27 | « sert au départ pour » ; « il ne reste que l'essence des réservoirs ; le reste va dans un dépôt » ; dépôt en trois listes de noms ; « Aucun stabilisateur ne répare une essence vieillie. La dose est celle qui est écrite… » ; « Une trace sombre…, un bidon gonflé : transvider…, jeter le contenant » | « sert à partir pour » ; « Ne garder… que l'essence qui est dans le réservoir des machines, et mettre le reste… » ; « Le placer… », « Le choisir… », « Ne rien y mettre… » ; « Verser du stabilisateur dans une essence vieillie ne la répare pas. Verser la dose écrite… » ; « S'il y a une trace…, transvider… et jeter le bidon abîmé » | Consigne au présent ; noms sans verbe ; maxime ; un seul mot par chose (« bidon ») |
| Étapes 28 à 33 | « on remet la sortie : l'ennui… se règlent autrement » ; « personne ne donne l'état : on se fie… on fait comme si » ; « on ne part pas » ; « on revient » ; « aller chercher quelqu'un, au ch. 16 » ; « **Lire le refroidissement éolien…** » ; « on part seulement si » | « remettre la sortie : on règle l'ennui… autrement » ; « l'état du chemin : se fier… faire comme si » ; « ne pas partir » ; « faire demi-tour » ; « la façon d'aller chercher quelqu'un, au ch. 16 » ; « **Se fier au refroidissement éolien…** » ; « partir seulement si » | Pronominal ; consigne à l'infinitif dans une étape ; étiquette |
| Étapes 35 à 39 | « Seul, rester à une distance » ; « l'allumage » ; « **Se regarder les visages à deux…, plus souvent que le délai de gelure du jour** » ; « s'arrêter dans ce qu'éclaire le phare » | « Avec une seule machine, ne pas aller plus loin qu'une distance… » ; « la trousse d'allumage » ; « **Se regarder le visage l'un l'autre à chaque arrêt, et s'arrêter plus souvent que le temps que met la peau à geler ce jour-là** » ; « assez lentement pour pouvoir s'arrêter dans la distance qu'éclaire le phare » | « Seul » ambigu ; un seul mot par chose ; code à déchiffrer |
| Étapes 40 à 43 | « la tarière passe vite, et on croit la glace plus épaisse » ; « **Comparer à ces épaisseurs** » ; « aucune épaisseur publiée ne s'y applique, on ne la traverse pas » ; « aucune épaisseur ne vaut pour elle, on n'y va pas » ; « et on déplace l'auto » | « le perçage va si vite qu'on croit facilement la glace plus épaisse qu'elle n'est » ; « **Comparer la mesure à ces épaisseurs** » ; « aucune des épaisseurs de l'étape 41 ne s'y applique ; ne pas la traverser » ; « aucune épaisseur ne la rend sûre ; ne pas y aller » ; « déplacer l'auto » | Règle 0 (fait signalé 3) ; consigne à l'infinitif |
| Section 5 | « On ne part pas » ; « On ne part pas sans » ; « Grise : demi-tour » ; « une main chaude dessus ; la gelure : ch. 25 » ; « plus souvent que le délai de gelure » ; « jeter le contenant » | « Ne pas partir » ; « Ne pas partir avant de l'avoir écrit » ; « Grise ou foncée : faire demi-tour » ; « la couvrir d'une main chaude ; pour soigner la gelure : ch. 25 » ; « plus souvent que le temps que met la peau à geler » ; « jeter le bidon abîmé » | Étiquettes |
| Section 6 | Lignes « L'avertisseur de CO affiche un chiffre, même bas » et « L'eau monte dans le trou percé à côté de l'auto » | coupées : mot pour mot les lignes « Génératrice en marche, l'avertisseur de CO » et « Auto arrêtée sur la glace » de la section 5 (et l'étape 43) | Redite d'un tableau à l'autre |
| Section 6, autres lignes | « ouvrir de l'extérieur, aérer » ; « jeter le contenant » ; « Demi-tour ; …le dire aux voisins » ; « on puise » | « ouvrir les portes depuis l'extérieur, laisser aérer, et chercher… » ; « jeter le bidon » ; « Faire demi-tour, marquer l'endroit et avertir les voisins » ; « quelqu'un puise » | Règle 0 |
| Section 7, siphon | « **Amorcer sans la bouche** » (le mot « siphon » n'apparaissait pas avant) ; « **À deux boyaux…** » ; « Glisser un boyau court qui s'arrête dans l'air du réservoir » ; « s'il ouvre à une couture » ; « continue seul » ; « Monté dans l'autre sens…, le clapet ne retient rien » ; « s'il reste un peu d'essence » ; « on tire alors » | « **Amorcer le siphon sans la bouche** » (ancre changée) ; « **Avec deux boyaux…** » ; « Glisser un boyau court dans le goulot : il doit s'arrêter au-dessus de l'essence » ; « s'il fend » ; « continue de couler seul » ; « Si on monte le tube étroit au-dessus de la bille, la bille ne retient rien » (un seul mot par chose) ; « avec un peu d'essence d'un autre bidon » ; « il faut alors tirer » | Règle 0 ; un seul mot par chose |
| Section 7, étirer | « les derniers litres vont à la scie : dans la scie, un litre devient du bois… ; dans la motoneige, il devient quelques kilomètres » ; « Le dernier plein… reste » ; « de l'huile à moteur… vaut mieux que de l'essence pure… Elle encrasse… et on les nettoie » | « on garde les derniers litres pour la scie, qui coupe le bois… ; dans la motoneige, un litre ne fait que quelques kilomètres » ; « On garde le dernier plein… » ; « on met de l'huile à moteur… plutôt que de faire tourner le moteur à l'essence pure… L'huile à moteur encrasse… : il faut les nettoyer » | Loi en formule (« devient ») ; « Elle » ambigu |
| Section 7, moteur gelé | « plus lent » en fin de phrase ; « Un lanceur cassé n'immobilise pas » ; « en deuxième, l'embrayage relâché » ; « **Pas d'éther…** » ; « **Deux batteries en série**, c'est pour souder… de la machine dont on dépend pour rentrer » | « Autre façon, plus lente : » ; « Avec un lanceur cassé, on peut quand même faire partir » ; « en deuxième vitesse et qu'on relâche l'embrayage » ; « **Ne pas utiliser d'éther…** » ; « **Ne pas démarrer avec deux batteries en série** : ce montage sert à souder… les 24 V brûlent le démarreur et le câblage » | Chose qui agit ; participe ; titre sans verbe ; complément qui décore |
| Section 7, réparer | « Sans câble : » ; « par-dessus les deux bouts » ; « il sert le temps de rentrer » ; « Pas de chambre à air du côté de l'essence » ; « Ni l'un ni l'autre ne tient… : on répare au retour » ; « l'écartement de la machine… la cale accroche » ; « Porcelaine fendue… : la bougie est perdue » | « Sans rien pour le remplacer, » ; « les deux bouts de la conduite » ; « il tient seulement le temps de rentrer » ; « Ne pas prendre de chambre à air pour un joint qui touche l'essence » ; « Ces réparations ne tiennent pas… : faire la vraie réparation au retour » ; « l'écartement que demande la machine… la cale d'épaisseur passe entre les électrodes en accrochant légèrement » ; « Si la porcelaine est fendue… » | Étiquettes ; mot non introduit |
| Section 7, pics | « jusqu'à ce que les deux pics se séparent d'un coup sec » | « jusqu'à ce qu'on puisse séparer les deux pics d'un coup sec » | Pronominal |
| Section 7, sans moteur | « Le plus fort marche devant… on le relaie » ; « On transporte la chaleur au lieu de la produire : …, un feu à chaque arrêt » ; paragraphe de la maison (« L'auto reste dans l'entrée, les voisins sont là… le chalet est à la même distance qu'avant… ») ; « Les charges lourdes… ne viennent plus » ; « la part intouchable existe pour eux, et on ne l'ouvre pas pour aller chercher du lait » | « La personne la plus forte… on la relaie » ; « On emporte des vêtements secs… et un thermos…, et on fait un feu à chaque arrêt » (la formule contredisait le feu) ; « À la maison, tant que la maison chauffe, on a tendance à brûler le dernier plein en commissions. On décide le transfert… selon le carburant qui reste… avec la charge et de jeunes enfants » ; « On ne peut plus transporter de charges lourdes » ; « c'est pour eux qu'on garde la part intouchable (étape 21) » | Opposition fabriquée ; petite scène ; chute en formule |
| Section 7, ce qu'on ne remplace pas | « Aucun sens et aucun montage ne détectent ce gaz » ; « On ne le fabrique pas au chalet » ; « pas le jour où le baril est vide » ; « pas un dépannage » | « On ne peut ni sentir ce gaz ni fabriquer de quoi le détecter » ; « On ne peut pas faire d'essence au chalet » (le gazogène se fabrique) ; « Il faut le bâtir l'été d'avant… » ; « demande lui aussi une préparation d'avance : un alambic et un carburateur réglé pour l'alcool » | Chute en formule ; contradiction |
| En plus, le bâton | « On frappe… on n'y marche pas. Si on passe à travers, on se hisse » | « Ils frappent… ils n'y marchent pas. S'ils passent à travers, ils se hissent » (79 mots) | « On » qui changeait de personne d'une phrase à l'autre |

## Ancres de planches

Toutes intactes, sauf une, changée par l'édition (le mot « siphon » manquait dans le titre du geste) :

| Planche | `apres` |
| --- | --- |
| logigramme | « **Trousse d'allumage, sur soi** » (inchangée) |
| 15-01 | « 3. **Prendre les pics à glace, s'il y en a au cou** » (inchangée) |
| 15-03 | « 8. {!glace} **Ne pas courir jusqu'au trou » (celle du rédacteur, pas encore reportée dans `placements-tome-1.json`) |
| 15-05 | « 40. {!glace} **Mesurer la glace avant d'y engager une machine, le jour même.** » (celle du rédacteur, pas encore reportée) |
| **15-02** | **« {!poison} **Amorcer le siphon sans la bouche** »** (nouvelle ; avant : « {!poison} **Amorcer sans la bouche** ») |
| 15-04 | « Il faut deux bouts de manche à balai, deux gros clous et un cordon » (inchangée) |
| 15-06 | « **Ski ou patin cassé.** » (inchangée) |

Chaque `apres` est un début de paragraphe unique (vérifié). Chaque planche est appelée une fois.

## Faits signalés (non tranchés par l'éditeur)

1. **Étape 8, la force des mains.** Le texte disait « au bout de quelques minutes dans l'eau, elles ne tiennent plus
   rien », l'étape 7 dit « une dizaine de minutes ». Les deux durées ne s'accordaient pas ; la phrase de l'étape 8
   renvoie maintenant à l'étape 7, et « quelques minutes » est sorti. La brochure du MN DNR ne donne pas de durée
   (« before they become too exhausted to hold onto it »). Au vérificateur de dire si une durée doit revenir.
2. **Étape 20.** « de 12 à 28 % dès 7 °C » se lisait « à partir de 7 °C ». La source (`20-rncan-…`, l. 19) dit « une
   baisse de température de 24 à 7 °C » : le texte reprend « quand la température passe de 24 à 7 °C ». Aucun
   chiffre nouveau.
3. **Étape 40.** « la tarière passe vite, et on croit la glace plus épaisse » est fidèle à la source (MN DNR : « It
   happens so quickly that it's easy to overestimate the thickness ») mais se comprend mal ; reformulé sans changer le
   sens. Le lien entre « vite » et « plus épaisse » reste celui de la source.
4. **Section 7, « Ski ou patin cassé » : « pour rejoindre la rive ».** Le but étonne (pourquoi la rive, et pas le
   chalet ?) ; non touché.
5. **Logigramme** (`images/logigrammes/15-se-deplacer.json`) relu : rien qui contredise le texte édité ; non touché.

## Édition des décisions de JP, 19 octobre 2026

Éditeur de la passe « décisions de JP » (`_reprise/scratchpad/tome1-final/decisions-jp.js`). Relu seulement les phrases que la passe a changées (texte d'avant : commit `03525fa`), à voix haute, avec le skill `ecriture` ; aucun fait ni chiffre touché, aucune ancre touchée. `controle.py --avant` (texte d'avant l'édition) : rien n'a disparu.

- En plus, « Reconnaître la glace en chandelles » : « colonnes perpendiculaires à la surface » devient « colonnes debout » ; « Elles ne sont plus liées entre elles » (on lisait « elles » comme les colonnes détachées) passe en tête : « …serrées comme des chandelles, qui ne tiennent plus entre elles. Quand on passe à travers… (étape 42). Les colonnes qui se détachent flottent et tintent en se cognant. » Mêmes faits, 55 mots.
