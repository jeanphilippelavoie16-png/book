> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 17. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Fiche de suivi — Chapitre 17, Feu sans allumettes

- **Tome :** 1 — Tenir
- **Fichier :** `chapitres/17-feu-sans-allumettes.md`
- **Rédigé le :** 20 septembre 2026
- **Rôle :** rédacteur (rôle 2)
- **État :** premier jet complet, gabarit à dix points respecté dans l'ordre
- **Longueur :** environ 4 600 mots utiles (5 757 mots au total en comptant la liste de
  sources et les URL), soit environ 6 à 7 pages en 8 × 10
- **Portes restantes :** vérificateur technique · vérificateur sécurité · éditeur ·
  metteur en pages

---

## 1. Chiffres marqués `[À VÉRIFIER]`

| # | Valeur dans le texte | Où | Pourquoi elle est marquée | Quoi faire |
| --- | --- | --- | --- | --- |
| 1 | Température à laquelle un briquet au butane cesse de donner de la vapeur | §2, premier point | Aucune fiche officielle du butane retrouvée. Le mécanisme s'appuie sur le propane (-42,04 °C, CNESST, fiche du ch. 14), qui lui est sourcé | Retrouver la fiche CNESST du butane (le Répertoire toxicologique a répondu « substance non trouvée » sur le numéro essayé) et coller le point d'ébullition, ou retirer la comparaison chiffrée |
| 2 | Tige de ferrocérium « 8 mm de diamètre ou plus » | §4, tableau matériel | Chiffre d'usage commercial, aucune source officielle | Confirmer par essai, ou remplacer par « assez grosse pour se tenir avec des mitaines » |
| 3 | Ensemble d'arc à feu : planchette de 1,5 à 2 cm, foret de 20 à 30 cm sur 2 cm, encoche d'environ un huitième de la circonférence | §9 | Dimensions d'artisanat, aucune source gouvernementale n'existe sur le sujet | **Valider par essai réel au chalet**, avec du thuya et du peuplier faux-tremble locaux, et corriger d'après le résultat. Une recherche documentaire ne réglera pas ce point |
| 4 | Autonomie d'une braise transportée : « une demi-journée » | §9 | Ordre de grandeur non sourcé | Mesurer en conditions réelles (boîte de conserve, cendre, amadouvier) et remplacer par la valeur mesurée |

**Chiffres volontairement absents du chapitre** (à ne pas réintroduire en révision) :
température d'une étincelle de ferrocérium (les 3 000 °C de la littérature commerciale),
température d'auto-inflammation du bois, nombre d'allumages par tige. Aucun n'est sourcé et
aucun ne change ce que le lecteur fait.

## 2. Chiffres sourcés utilisés (rien à valider, mais à ne pas modifier sans revenir à la source)

| Valeur | Source | Fichier dans `/sources` |
| --- | --- | --- |
| CO : densité 0,96 ; VEMP 35 ppm ; VECD 175 ppm ; DIVS 1 200 ppm ; 3 200 ppm = coma et mort en 30 min | CNESST, Répertoire toxicologique | `17-cnesst-monoxyde-de-carbone.md` |
| CO résidentiel : 25 ppm sur 1 h, 10 ppm sur 24 h | Santé Canada | `17-sante-canada-air-interieur-monoxyde.md` |
| Avertisseur de CO : hors plage sous 4,4 °C et au-dessus de 37,8 °C ; à plus de 2 m d'un appareil de combustion ; essai mensuel | Gouvernement du Québec | `17-quebec-avertisseurs-monoxyde-de-carbone.md` |
| « N'utilisez jamais d'accélérant » ; ramonage 1 fois par année ; cendres 7 jours en contenant métallique | Gouvernement du Québec | `17-quebec-chauffage-au-bois.md` |
| Feu de camp : 1 m × 1 m ; vent de 20 km/h ; indice « élevé à extrême » ; extinction jusqu'à absence de chaleur ; obligation de rester sur place | SOPFEU | `17-sopfeu-feux-de-camp.md` |
| Bois : humidité M20 ≤ 20 % et ≈ 25 % idéale ; bois d'allumage D2 ≤ 2 cm et D5 de 2 à 5 cm ; bûches < 15 cm | Ressources naturelles Canada | `17-rncan-classes-bois-chauffage.md` |
| Dextérité : chute sous 16 °C de peau ; 10 min de travail fin à mains nues ; mitaines à -17,5 °C | CNESST, *Travailler au froid !* | `17-cnesst-travail-au-froid.md` |
| Hypothermie : 35 °C ; légère 32,2–35 ; modérée 28–32,2 ; grave sous 28 | Gouvernement du Québec | `17-quebec-hypothermie.md` |
| Gibier sauvage : 74 °C à cœur | MAPAQ | `17-quebec-cuisson-temperatures-internes.md` |
| Inflammables : 30 L / 5 L en logement, 50 L / 30 L en garage ou cabanon | Gouvernement du Québec | `17-quebec-produits-dangereux.md` |
| Propane : ébullition à -42,04 °C (cité par renvoi au ch. 14) | CNESST | `14-cnesst-reptox-propane.md` |
| Centre antipoison du Québec : 1 800 463-5060 | Gouvernement du Québec | `17-quebec-prevenir-intoxications-monoxyde.md` |

## 3. Règles de sécurité de `CLAUDE.md` répétées dans ce chapitre

| Règle du tableau | Où elle est reprise | Mécanisme donné |
| --- | --- | --- |
| Génératrice : jamais dans un bâtiment, un garage ou sous un auvent | §8, encadré danger | Combustion incomplète, CO de densité 0,96 qui se mélange à l'air ambiant, inodore |
| Cuisson du gibier sauvage à 74 °C à cœur | §6 (points de contrôle) et §8 | La braise ne donne aucun repère de température, la couleur de la viande ne dit rien, seul le thermomètre à sonde mesure |
| Trichinellose : ni le sel, ni le fumage, ni le gel domestique ne la détruisent | §8, dernière ligne du bloc cuisson, avec renvoi au ch. 48 | Seule la cuisson détruit la trichine — d'où l'obligation du thermomètre |
| Thuyone du cèdre toxique — sapin baumier ou épinette pour la vitamine C | §8, rappel final | Le thuya occidental est le meilleur amadou et le meilleur bois de friction de la forêt boréale : le lecteur va le manipuler dans ce chapitre précis, il faut donc lui dire ici qu'il ne le met pas dans une tisane |

Règles du tableau **non reprises** parce qu'elles ne s'appliquent pas au sujet : foie et reins de
cervidés (cadmium), tularémie du lièvre, botulisme de type E, mal de caribou. Elles sont traitées
aux chapitres concernés.

## 4. Images requises

| # | Sujet | Format | Cadrage |
| --- | --- | --- | --- |
| 1 | La chaîne d'allumage complète : amadou fin, tas D2 (≤ 2 cm), tas D5 (2 à 5 cm), bûches < 15 cm, disposés en quatre tas séparés avec le bûcher monté au centre | Pleine page | Vue de dessus à 45°, lumière rasante pour que les calibres se lisent ; règle ou main dans le cadre pour l'échelle ; neige tassée en arrière-plan pour situer la saison |
| 2 | Le geste du ferrocérium en trois vignettes : grattoir posé immobile, tige tirée vers soi, gerbe qui tombe dans le creux du nid | Demi-page, bande de trois | Gros plan sur les mains, fond sombre, vitesse d'obturation lente sur la vignette 3 pour que la gerbe se voie. **La vignette 2 doit montrer clairement que c'est la tige qui bouge, pas le couteau** : c'est l'erreur corrigée dans le texte |
| 3 | Nid d'amadou fermé en boule au moment du souffle, fumée blanche épaisse | Demi-page | Contre-jour, à hauteur de visage, bras à demi tendu, pour montrer la distance de soufflage décrite à l'étape 11 (une longueur d'avant-bras) |
| 4 | Écorce externe de bouleau à papier détachée en rubans sur bois mort, à côté d'une coulée de gomme d'épinette noire | Quart de page | Plan rapproché en forêt, écorce prise sur un arbre **mort** (ne jamais photographier un prélèvement sur arbre vivant : le livre montrerait le mauvais geste) |
| 5 | Ensemble d'arc à feu, pièces séparées et nommées : arc, corde, foret, planchette avec cavité et encoche, palier | Quart de page | À plat sur fond neutre, vue de dessus, légendes numérotées ; **les dimensions ne s'inscrivent sur la planche qu'après validation de l'essai réel** (voir §1, point 3) |
| 6 | Boîte métallique à amadou carbonisé ouverte, contenu noir et souple, à côté de la boîte percée d'un trou de clou | Quart de page | Gros plan, fond clair, un carré de coton carbonisé tenu entre deux doigts pour montrer qu'il se plie sans s'effriter |

Toutes les images sont à produire par JP, ou à prendre sur Wikimedia Commons / iNaturalist avec
la licence inscrite dans `images/credits.md`. Aucune image du chapitre n'est reprise du web au
moment de la rédaction.

## 5. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 3 — Le froid lui-même | Gelures, hypothermie, seuil de dextérité : le chapitre 17 donne les seuils, le chapitre 3 donne les soins |
| 8 — Le stock permanent du chalet | Réserve d'allumettes, de tiges de ferrocérium, de piles ; entreposage des piles bornes protégées |
| 9 — La liste de 72 heures | Le nécessaire à feu qui part dans le sac |
| 14 — Sans propane | Pression de vapeur du propane (-42,04 °C) qui fonde l'explication du briquet gelé, et fiche CO |
| 15 — Poêles à bois et rendement | Tirage, bois sec, sifflement du bois vert |
| 16 — Le feu au chalet | Cheminée, créosote, extinction, cendres : les deux chapitres doivent dire la même chose, à relire ensemble |
| 18 — Éclairage | Chandelles, lampes à gras |
| 19 — Communiquer et savoir | Signaler un feu de forêt qui échappe |
| 25 — Le scorbut et l'arbre de vie | Thuyone du thuya, vitamine C du sapin baumier |
| 26 — Ce qu'un corps demande l'hiver | Coût calorique de l'arc à feu |
| 27 — Soigner quand il n'y a personne | Brûlures, intoxication au CO |
| 30 — Plantes médicinales boréales | Thuyone, usages du cèdre |
| 48 — Ours noir | Trichine, cuisson à 74 °C |
| 54 — Pêche blanche | Feu sur la glace, cabane de pêche et CO |
| 59 — Champignons | Amadouvier (*Fomes fomentarius*) comme porteur de braise |
| 60 — Sève, gomme, écorces | Gomme d'épinette, écorce de bouleau, bois gras |
| 67 — Pemmican et graisses | Suif et gras comme allume-feu |
| 82 — Affûter, limer, aiguiser | Arête vive du grattoir, dos de couteau meulé à angle droit |
| 88 — Trempe et travail du métal à chaud | Acier trempé du briquet à silex |
| 89 — Savon et chandelles | Chandelle de suif faite au chalet |

## 6. Relecteur humain

Le chapitre 17 **ne figure pas** à la liste de relecture humaine obligatoire de `CLAUDE.md`. Le
chapitre 16 (Le feu au chalet) y figure, et les deux chapitres portent le même contenu de
sécurité — monoxyde de carbone, accélérants, extinction, cendres.

**Recommandation : relecture par un technicien en prévention des incendies (TPI) ou un pompier,
en même temps que le chapitre 16**, portant sur l'encadré danger (§8), la procédure (§5) et le
tableau des points de contrôle (§6). Deux textes qui se contrediraient sur la même règle
seraient pires qu'un seul texte imparfait.

## 7. Notes pour l'éditeur

- **Contrainte de recherche pendant la rédaction :** le budget de recherche web de la session a
  été épuisé avant la fin. Les douze pages officielles enregistrées ont été obtenues par accès
  direct aux URL, pas par recherche. Deux pistes n'ont pas pu être explorées et restent
  ouvertes : la fiche CNESST du butane, et une source officielle sur les propriétés de l'écorce
  de bouleau à papier comme allume-feu. Aucune des deux ne bloque le chapitre ; la première
  réglerait le `[À VÉRIFIER]` nº 1.
- **La section 5 est longue** (26 étapes réparties en six blocs). C'est voulu : cinq méthodes
  d'allumage plus la tenue du feu. Si la mise en pages force une coupe, le bloc D (lentille)
  est le plus réductible — c'est la méthode la moins utile sur la Côte-Nord l'hiver, et le texte
  le dit.
- **Le numéro du Centre antipoison (1 800 463-5060) apparaît dans l'encadré danger et dans le
  tableau des signes d'échec.** La répétition est intentionnelle : les deux endroits se
  consultent en panique, et pas dans le même ordre.
- **Une phrase à ne pas adoucir en révision :** « deux tentatives, puis l'abri ». C'est la seule
  règle du chapitre qui demande au lecteur d'abandonner, et c'est celle qui sauve la personne en
  hypothermie modérée dont le jugement est déjà atteint.
- Noms latins présents au moins une fois : *Betula papyrifera*, *Picea mariana*, *Abies
  balsamea*, *Pinus banksiana*, *Thuja occidentalis*, *Populus tremuloides*, *Typha latifolia*,
  *Fomes fomentarius*.
- Aucune date de période réglementée, aucune limite de prises dans le chapitre. Les
  interdictions de feu à ciel ouvert renvoient à l'état de situation de la SOPFEU et à la
  réglementation municipale de l'année.

## Passe « pas de code légal, signes expliqués » — 23 septembre 2026

**Légal retiré.** Section 6, ligne « Avant d'allumer » : « Vent et interdictions » devient « Vent
et sécheresse », et « aucun avis d'interdiction en vigueur » sort de la cible. Le vent et
l'indice de danger restent : ce sont eux qui disent si le tison part plus loin qu'on peut le
suivre. La note plus haut (« Les interdictions de feu à ciel ouvert renvoient à l'état de
situation de la SOPFEU et à la réglementation municipale de l'année ») ne correspond plus à rien
dans le chapitre. Gardés parce que ce sont des services qu'on appelle : 9-1-1, Centre
antipoison, « signaler si ça échappe ».

**Note de bas de page ajoutée.** [^1], section 2, sur le seuil de 16 °C de la peau des mains :
comment on le reconnaît sans thermomètre (douleur des doigts au froid, engourdissement, gestes
lents et imprécis).
- Source : `sources/17-inrs-travailler-ambiance-thermique-froide.md` (INRS, *Références en
  santé au travail* n° 160, TC 167, 2019) — « Le seuil de douleur est à 15 °C » pour la peau des
  doigts ; « Les mouvements des doigts sont altérés, moins précis, moins rapides, les doigts sont
  engourdis. » Le 16 °C lui-même reste celui de la CSST (`17-cnesst-travail-au-froid.md`).
- Réserve : source française, pas québécoise ; la CSST ne décrit pas le repère sensible.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/17-verifications.md`, appliqués au chapitre. Une ligne par chiffre
changé ou confirmé.

- § 2, 1re puce — « le butane cesse de vaporiser bien avant » → **le butane bout vers 0 °C
  (-0,5 °C), l'isobutane vers -11 °C** : `sources/17-butane-essence-proprietes.md`.
- § 4 Matériel, tige de ferrocérium — « 8 mm de diamètre ou plus » : **introuvable**, diamètre
  retiré (« le plus gros modèle qu'on trouve ») ; ajouté sous le tableau : la grosse tige donne de
  l'ordre de **12 000 frappes contre 3 000** pour la petite du même fabricant :
  `sources/17-light-my-fire-tiges-ferrocerium.md`.
- § 8 DANGER, « Jamais d'accélérant » — « bien en dessous de zéro » → point d'éclair de l'essence
  **-43 °C** (-45 °F) : `sources/17-butane-essence-proprietes.md` ; définition du point d'éclair :
  `sources/88-cchst-point-declair-glossaire-simdut.md`.
- § 9, boîte à braise — « une demi-journée de marche » : **introuvable** (la pratique est confirmée
  sans durée par `sources/17-us-army-fm21-76-feu.md`) ; chiffre retiré, remplacé par l'essai sur un
  court trajet.
- § 9, amadouvier travaillé — concentrations de lessive et de salpêtre : **introuvables** ; le
  drapeau sort, la phrase dit maintenant comment faire l'essai.
- § 9, arc à feu — planchette « 1,5 à 2 cm » → **environ 2,5 cm** d'épaisseur, 10 cm de large, creux
  à 2 cm du bord ; foret « 20 à 30 cm × 2 cm » → **environ 25 cm × 2 cm** (confirmé) ; encoche « le
  huitième de la circonférence » : aucune fraction dans la source, remplacée par l'encoche en V du
  bord jusqu'au centre du creux : `sources/17-us-army-fm21-76-feu.md`. Non tranché, laissé à
  l'éditeur (note A des vérifications) : la source veut un foret de **bois dur** sur une planchette
  de bois tendre, le chapitre dit « la même essence ».
- Compression §3 et §4 — 27 septembre 2026 : 1236 mots → 239 mots (§3 : 516 → 112 ; §4 : 720 → 127) ; matériel coupé : boîte hermétique à amadou, écorce de bouleau, charpie vaselinée, chandelle, laine d'acier + pile, loupe, briquet BBQ, thermomètre à sonde (le 74 °C reste en §8 et §9), quantités, substituts (repris en §9) et le paragraphe des frappes 12 000 / 3 000 ; §3 perd les quatre familles de sources, le 25 % (reste en §6) et le détail des souffles (reste à l'étape 11 et en §7). La plage 4,4–37,8 °C de l'avertisseur reste en §6.

## Refonte complète avec les règles du 15 et du 16 octobre 2026 (chapitre test)

Chapitre réécrit au complet, les neuf sections, sur les modèles des ch. 11 et 3 et le skill `ecriture`
(tableau « Ce que la relecture du 15 octobre change à la passe », points 1 à 19 de la pause du
plan de match). 6 027 → 5 325 mots (`wc -w`), 0 tiret dans le texte (les deux qui restent sont ceux de la
ligne de titre et de la ligne de tome, que `build_chapitre.py` lit pour trouver le numéro et le titre),
0 « § », 0 mot banni.

**Structure.** Rien sous la ligne de lieu (**Chalet**). Section 2 en quatre puces, sans liste « mauvais
choix ». Section 3 renommée « Comment ça marche » : quatre mécanismes, chacun avec ce qu'il change et son
étape (120 mots). Matériel : cinq lignes (l'avertisseur de CO sort de la liste, aucune procédure du
chapitre ne fait de feu dans un abri ; il reste à la section 8). Procédure : une série orange, puis
« le détail », puis monter le feu, ferrocérium, pile ou batterie, soleil, amadou carbonisé, éteindre
(29 étapes). « Garder le feu » (couvrir, relais, boîte à braise) passe tout entier en section 9 : il ne
demande rien d'acheté, et il était dit deux fois (étapes 24 et 25, et section 9).

**La série orange.** « Il faut un feu tout de suite, par grand froid » {.orange 10 min}, étapes 1 à 7.
La pastille est la durée de travail fin à mains nues au-delà de laquelle il faut réchauffer les mains
(CSST, *Travailler au froid !*, `sources/17-cnesst-travail-au-froid.md` : « travail de précision à mains
nues d'une durée de plus de 10 minutes »). Le déclencheur est le besoin de feu par grand froid ; le temps
est celui des mains de la personne qui allume. L'ordre (mettre au sec avant d'allumer) suit le ch. 25,
étape 27 (« l'habillage sec passe avant tout le reste »). L'inventaire `plan/premieres-minutes-inventaire.md`
classait le ch. 13 sans geste urgent : à mettre à jour si JP garde la série.

**Sous-étapes.** Étape 8 (l'endroit : sol, humus, neige, pierres, taille et vent), 12 (fendre), 13 (tipi),
14 à 17 (nid, étincelle, flamber, glisser : planche 13-40, repères 1 à 18), 20 (la batterie), 25 à 27
(la boîte d'amadou carbonisé : planche 13-07, repères 1 à 7) ; en section 9, la boîte à braise (13-08,
repères 1 à 10), l'amadouvier (13-07, repères 13 à 19), le cornet (13-07, repères 8 à 12), le briquet à
pierre (13-09, repères 1 à 9), l'arc à feu (13-01, repères 1 à 15). Numéros pris dans
`reperes.json` de l'agent des planches (provisoire, 16 octobre) ; l'ordre du texte suit les repères.

### Provenance des chiffres du texte

| Chiffre | Où | Source |
| --- | --- | --- |
| Butane 0 °C, isobutane −11 °C | Section 3 | `17-butane-essence-proprietes.md` (NIOSH, NIST) |
| 10 min de travail fin à mains nues ; 16 °C de peau ; −17,5 °C mitaines | Série orange, détail, section 6 | `17-cnesst-travail-au-froid.md` |
| 15 °C, seuil de douleur des doigts | Détail de la série orange (ancienne note [^1]) | `17-inrs-travailler-ambiance-thermique-froide.md` |
| Moins de 2 cm, 2 à 5 cm, bûches de moins de 15 cm, environ 25 % d'humidité | Étapes 3, 10, section 6 | `17-rncan-classes-bois-chauffage.md` |
| 1 m sur 1 m ; vent de 20 km/h | Étape 8, section 6 | `17-sopfeu-feux-de-camp.md` |
| Drapeau déployé à 16 km/h, papier journal soulevé à 24 km/h | Étape 8, section 6 | `03-cnesst-travail-au-froid.md` (déjà au dossier) |
| Pile de 9 V qui court-circuitée par du métal chauffe assez pour allumer un feu ; pile faible encore dangereuse | Étape 19 | **nouvelle** : `13-feu-nfpa-pile-9-volts.md` (+ PDF) |
| Batterie au plomb : hydrogène explosif | Étape 20 | `15b-travail-securitaire-nb-batterie-gelee.md` (déjà au dossier) |
| Planchette 2,5 × 10 cm, cavité à 2 cm du bord, foret 25 × 2 cm de bois dur, arc vert de 2,5 cm | Section 9, arc à feu | `17-us-army-fm21-76-feu.md` |
| CO : densité 0,96, sans odeur | Section 8 | `17-cnesst-monoxyde-de-carbone.md` |
| Avertisseur fait pour 4,4 à 37,8 °C | Section 8 | `17-quebec-avertisseurs-monoxyde-de-carbone.md` |
| Essence inflammable jusqu'à −43 °C | Section 8 | `17-butane-essence-proprietes.md` |
| Hypothermie sous 35 °C ; 28 à 32,2 °C, jugement atteint | Section 8 | `17-quebec-hypothermie.md` |
| 74 °C à cœur | Section 8 | `17-quebec-cuisson-temperatures-internes.md` |

Faits sans chiffre ajoutés, avec leur source (extraits ajoutés le 16 octobre à
`sources/17-us-army-fm21-76-feu.md`, tirés du PDF déjà enregistré) : pierres mouillées ou poreuses qui
éclatent (étape 8) ; deux ou trois rangs de bois vert sur la neige (étapes 4 et 8) ; le tipi qui brûle
avec du bois humide et l'allumage du côté du vent (étape 13) ; la lentille seulement par soleil franc
(étape 23) ; le feu qui brûle sous terre et ressort plus loin (étape 8) ; la quenouille, l'écorce de cèdre,
le bois gras et la gomme figée comme amadou (section 9) ; l'acier inoxydable qui ne donne pas de bonne
étincelle (section 9). Synthétique qui fond : `16c-sewing-org-test-de-combustion-fibres.md`. Amadouvier
(sabot, croûte grise et dure, sur le bouleau ; tissu interne pour allumer et porter les braises) :
`59-rncan-carie-blanche-spongieuse-amadouvier.md`.

Restent sans source, sans chiffre, à vérifier si JP le demande : l'écorce de bouleau qui brûle humide
(aucune page officielle trouvée le 16 octobre, seulement des blogues et des forums), la laine d'acier « la
plus fine » (le grade 0000 de l'ancien texte n'a aucune source et sort), la mine de crayon et le filament
d'ampoule, la lentille de glace, le son clair ou mat du bois.

### Chiffres retirés, et pourquoi

- « à trois mètres » (le nid projeté), « neuf fois sur dix », « 60 secondes après la flamme », « 30
  secondes » (signes d'échec), « ressort à dix mètres », « à deux centimètres » (la paillette), « une
  douzaine de trous », « les dix premières minutes », « deux poignées », « une journée pour tailler un
  arc », « un quart d'heure contre le ventre », « en moins d'une minute », « allumée le matin, encore
  vivante à midi », « 15 h en janvier », « −30 °C » (mitaines) : aucune source. Remplacés par un repère
  observable ou par le chiffre sourcé (−17,5 °C).
- Grade de laine d'acier 0000 : aucune source.
- « Deux tentatives, puis l'abri » : règle sans source ; remplacée par la limite sourcée de 10 minutes à
  mains nues (étape 7) et le mécanisme de l'hypothermie (section 8, point 3).
- CO 35, 175, 1 200 et 3 200 ppm ; 25 ppm sur 1 h et 10 ppm sur 24 h : sourcés, mais aucun ne change ce que
  fait la famille sans appareil qui affiche les ppm ; ils restent au ch. 3 et au ch. 26.
- Propane −42,04 °C (ch. 87) : il servait de comparaison ; le briquet est au butane.
- Cendres : 7 jours en contenant de métal : c'est la vidange du poêle, pas l'allumage ; renvoi au ch. 82
  (étape 29), et le ch. 3 le dit à l'étape 14.
- 74 °C : 3 → 1. Gardé une fois, en section 8, point 4. Le chapitre n'a aucune étape de cuisson ; la
  ligne du tableau de la section 6 et la puce « Ce qui ne se remplace pas » le redisaient.
- Renvois sortis : ch. 5 (piles en boîte à part : la consigne de rangement sort, CLAUDE.md), ch. 33, ch. 58,
  ch. 72, ch. 87, un des deux ch. 26 ; ch. 82 reste une fois.

### Faits redits, et la place gardée

| Fait | Avant | Gardé |
| --- | --- | --- |
| Hypothermie, 35 °C et 28 à 32,2 °C | Section 2 et section 8 | Section 8, point 3 |
| Mains : 16 °C, 10 min, −17,5 °C | Sections 2 et 6, étape 15 | Série orange (geste), son détail (mécanisme), section 6 (cible) |
| CO : mécanisme | Sections 2, 6, 7, 8, 9 | Section 8, point 1 ; une ligne de signe en section 7 |
| Couvrir le feu pour la nuit | Étape 24 et section 9 | Section 9 |
| Boîte à braise | Étape 25 et section 9 | Section 9 |
| Feu dans l'humus | Étape 1, section 7, section 8 | Étape 8 (mécanisme), étape 29 et section 7 (geste) |
| Bois mort debout, le bois au sol mouillé | Étape 4 et section 9 (arc) | Étape 11 ; l'arc à feu dit seulement « pris debout » |
| L'amadou sec qui ne se trouve pas dehors | Section 9, deux fois | Section 9, l'amadou qu'on ramasse |
| Étincelle de pierre trop faible pour l'ouate | Étape 22 et section 9 | Section 9, le briquet à pierre |
| Synthétique qui fond | Après l'encadré, et sur la planche 13-40 | Étape 16 (texte) ; la planche garde sa note |
| Thuyone | Après l'encadré | Section 8, point 5 (le thuya sert à l'amadou et à l'arc) |

### Sorti, et pourquoi

- La note de lieu, les deux listes « bon choix / mauvais choix » de la section 2 (le mauvais choix
  devenait un contre-exemple évident ; ce qui retourne un réflexe est passé dans l'étape ou l'encadré).
- Les phrases sur le livre ou le chapitre (« Cette section est écrite pour le cas où… », « C'est la vraie
  réponse historique », « la technique la moins spectaculaire du chapitre »), les chutes (« Le même arbre,
  deux usages, un seul mortel », « On échange une garantie contre une compétence », « Une journée perdue
  là-dessus est une journée de bois pas coupé »), les titres en maxime (« Le feu le moins cher est celui
  qu'on n'éteint pas » devient « Garder le feu »), les titres avec tiret.
- « Coffre » et consignes de rangement des piles au lithium (domestique, sans source) ; la pile de 9 V
  reste, parce que le court-circuit qui allume la laine est celui qui met le feu au sac (NFPA).
- Les nids de souris dans la liste d'amadou (hantavirus, ch. 76 ; rien ne les rend nécessaires).
- « Signaler si ça échappe » (service à appeler).

### Confrontation des dangers

- Couvrir le feu pour la nuit contre le poêle étouffé du ch. 3 (section 8) : la section 9 dit maintenant de
  couvrir dehors ou dans un foyer ouvert seulement, et de garder l'air du poêle ouvert (ch. 3, étape 6).
- Mettre la personne mouillée au sec avant le feu : conforme au ch. 25, étape 27.

### Ce dont je doute

- **L'essence du foret.** Le FM 21-76 veut un foret de bois dur sur une planchette de bois tendre ; l'ancien
  texte et l'ancienne planche disaient « la même essence ». Le texte suit la source ; l'agent des planches
  a corrigé le repère 4 (« foret de bois dur, sec, droit »). Aucune essence de bois dur locale n'est
  sourcée : le texte n'en nomme pas.
- **La pastille de 10 min.** Elle mesure le temps des mains, pas celui de la personne mouillée. Si JP veut
  une pastille qui dise le temps de la personne mouillée, il faut une source (aucune trouvée).
- **Planche neuve 13-10** (pile et laine d'acier), proposée par l'agent des planches : pas dessinée à la fin
  de la passe, donc pas appelée. Son appel irait à l'étape 18.
- Les ancres de `design/epreuves-livre/placements-tome-1.json` pour le ch. 13 sont à remplacer par celles
  de la passe (planches 13-01, 13-07, 13-08, 13-09, 13-40, les deux photos et le logigramme neuf).

## Passe du 16 octobre 2026 (soir) : huit sections, tout dans l'orange, plus de loi en formule

Sur la version du matin (`demo-13/13-v1.md`), avec les corrections de JP sur cette version : points 20, 21
et 22 de la pause du plan de match, et les dernières lignes du tableau du skill `ecriture`. 5 324 → 5 377 mots
(`wc -w`, première partie de la passe), puis 5 478 après la liste de `.claude/cadre-agents.md` ; 6 027 avant toute passe. 0 tiret dans le texte (les deux de la ligne de titre et de la ligne de
tome restent pour `build_chapitre.py`), 0 « § », 0 mot banni, 0 avis « tournure ».

**Huit sections.** « Comment ça marche » sort ; Matériel devient la section 3, Procédure 4, Points de contrôle
5, Signes d'échec 6, DANGER 7, Variante d'urgence 8. Renvois internes suivis : « section 9 » → « section 8 »
(sections 2, 3, 4 et 6), « section 7 » (signes d'échec, étape 29) → « section 6 ». « ch. 11, section 9 » ne bouge
pas (ch. 11 pas migré). Les étapes gardent leurs numéros (1 à 29). Le moteur (`build_chapitre.py`) reconnaît maintenant
la Danger et la variante à leur titre : le chapitre à huit sections se lit sans changement (vérifié par `parse`).

**L'ancienne section 3, morceau par morceau.**
- L'étincelle qui n'allume que du très fin, et la montée d'une grosseur à la fois → étape 10, dit par la chaîne
  qu'on voit (« L'étincelle allume l'amadou ; la flamme de l'amadou allume le bois de moins de 2 cm… »).
  Source ajoutée : extrait « Fire Material Selection » dans `sources/17-us-army-fm21-76-feu.md`.
- « Dans une fibre mouillée, la chaleur part à évaporer l'eau » → étape 12 : « Le bois mouillé use la chaleur de
  la petite flamme du nid à sécher son eau, et la flamme s'éteint avant que le bois prenne » (forme du skill).
  Section 6 : « Bois vert ou mouillé : l'eau du bois bout ».
- « Une braise devient flamme quand l'air lui arrive sans arrêt, d'où le souffle continu » → étape 16 : « Pour que
  la braise grossisse et s'enflamme, il faut lui envoyer de l'air sans arrêt : chaque fois qu'on arrête pour
  reprendre son souffle, elle refroidit. » La ligne de la section 6 ne redit plus le mécanisme.
- Le briquet sous son point d'ébullition (0 °C butane, −11 °C isobutane) → étape 2 (orange), dit par la
  pression : « le butane n'a plus assez de pression pour sortir du briquet » (c'est le mot de la fiche source).

**L'orange a absorbé « le détail ».** La partie « Il faut un feu tout de suite : le détail » sort. Étape 1 : un
adulte pour la personne mouillée, l'autre pour le feu ; seul, des vêtements secs d'abord. Étape 2 : le pourquoi
du briquet et « allumer tout de suite, avant que le briquet refroidisse ». Étape 3 : pourquoi garder les
mitaines. Étape 5 : pourquoi la pile et la batterie (le geste se fait avec les mitaines) et le repère de la
douleur (16 °C de peau, 15 °C de douleur). Étape 7 : le pourquoi des 10 minutes.

**Ce qui ne se redit plus ailleurs.** Section 5 : les deux lignes « Avant d'enlever les mitaines » (−17,5 °C) et
« Pendant le travail à mains nues » (10 min) sortent, l'orange les porte. Section 7, point 3 : « les vêtements
secs, l'abri et le sac de couchage passent avant le feu » sort (étape 1) ; il reste le mécanisme et la consigne
qui n'est dite nulle part ailleurs (l'autre adulte fait arrêter l'essai, étape 7). Les appels de planche en
double dans une même étape sortent (13-07 à l'étape 25, 13-08, 13-09, 13-01) : le premier appel reste, la suite
dit « repère N ». « souffler comme à l'étape 16 » devient « souffler (étape 16) ».

**Autres corrections à la lecture à voix haute.** « d'où vient le vent » → « du côté du vent » ; « Ne pas mettre de
pierres mouillées » → « prendre des pierres sèches et dures » ; « Ne pas allumer quand le vent dépasse » → « Allumer
dehors seulement quand le vent reste sous 20 km/h » ; « la combustion avance seule » → « le rouge s'étend seul
dans la boule » ; « son silence ne prouve rien » (chute) → « il peut ne pas sonner même s'il y a du CO » ; « Ce qui
brûle, c'est la vapeur » → « L'essence brûle par sa vapeur » ; « Un couteau qu'on pousse… » → « Si on pousse le
couteau… » ; « Une personne est chargée du feu » (présent qui décrit) → « On charge une personne du feu » ; « la
tâche change de mains » → « on change de personne » ; « Le coton doit… se déchirer » → « on doit pouvoir le
déchirer » ; « Ce qui ne se remplace pas » → « Ce qu'on ne peut pas remplacer » ; « la batterie qui allume le feu
est aussi celle qui démarre l'auto » → « pour garder dans la batterie assez de charge pour démarrer l'auto » ;
le palier « sinon la chaleur se fait aux deux bouts » → « le foret doit chauffer seulement en bas, dans la
cavité » ; l'amadouvier « il devient une mèche lente » → « il couve seul, lentement, comme une mèche ». Au soleil,
la lentille de glace et le réflecteur deviennent des paragraphes (pour leurs petites planches), les autres
lentilles une ligne.

**Logigramme.** `images/logigrammes/13-feu-sans-allumettes.json` : « section 9 » → « section 8 » partout, la case
des étapes 2 et 3 dans l'ordre des étapes (le briquet d'abord). Rendu, 0 erreur, 0 avis ; ancrage après le
dernier item du Matériel (« **Eau, sable ou terre** »).

**Photos.** Ancres séparées (elles avaient la même) : l'écorce de bouleau sur sa ligne de la liste d'amadou, la
gomme d'épinette sur la sienne.

**Deuxième tour, contre la liste « Le texte » de `.claude/cadre-agents.md`.**
- L'urgence sans préparation : l'étape 2 commence par « S'il y a un briquet au butane… » ; l'étape 4 ne dit plus
  « sortir l'amadou de sous ses vêtements » (préparation qui n'a peut-être pas eu lieu) : l'étape 3 fait ramasser
  l'amadou avec le bois (écorce de bouleau, barbe de vieillard), et l'amadou qu'on avait sur soi sert en premier.
- Consigne confrontée au scénario : la règle du vent (20 km/h, feu de camp) contre le feu dont on a besoin pour se
  réchauffer. Ajouté à l'étape 8 : sans poêle, le feu le plus petit possible, derrière une butte, un rocher ou un mur
  de neige, et dégager plus large autour **[À VÉRIFIER]** (aucune source ne tranche ; à lever ou à couper).
- Loi en formule encore trouvée : « La lumière chauffe une matière sombre ; une matière blanche la renvoie » → « Le
  point de lumière fait fumer une matière sombre ; sur une matière blanche, il ne fait presque rien » ; « L'essence
  brûle par sa vapeur » → « Versée sur des braises, l'essence dégage un nuage de vapeur invisible… ; la vapeur prend
  feu ».
- Mot que personne n'emploie : « écharper » → « effilocher » (étapes 6, 14, sections 5 et 6). La légende du repère
  7 de la 13-40 dit « fibres lâches : le jour passe » : rien à changer sur la planche.
- Procédures tassées découpées : étape 29 (éteindre) en quatre sous-étapes ; « Couvrir le feu pour la nuit » en
  quatre ; l'arc à feu, « Tourner le foret », en six (repères 10 à 15).
- Petites retouches : « Il doit rayer le verre » → « La pierre doit rayer le verre » ; « selon la braise » →
  « selon la braise qu'on a mise ».

**Planches.** Repères de la 13-40 neuve (`demo-13b/reperes.json`) : mêmes numéros et même ordre que le texte (1 à 4
étape 10, 5 et 6 étape 13, 7 et 8 étape 14, 9 à 12 étape 15, 13 à 16 étape 16, 17 et 18 étape 17) ; rien à
renuméroter. Planche 13-10 appelée à l'étape 18 (repères 1 à 3 étape 18, 4 et 5 étape 19, 6 à 8 étape 20, 9 et 10
section 8). Petite planche 13-11 (lentille de glace) appelée une fois, au bout de son paragraphe en section 8 ; la
13-12 (réflecteur) n'a pas été dessinée, le paragraphe du réflecteur reste sans appel. Ancrages :
`demo-13b/ancrages-texte.json`, chaque `apres` vérifié unique contre le texte parsé.

**Reste ouvert.** La pastille de 10 min est le temps des mains, pas un temps compté depuis le déclencheur (doute
déjà noté) ; le [À VÉRIFIER] du vent ; la lentille de glace, le réflecteur, la mine de crayon et l'écorce de bouleau
qui brûle humide restent sans source (sans chiffre) ; 13-10 (étape 18) et 13-07 (étape 25) sont à environ une demi-page
l'une de l'autre : vérifier au montage qu'elles ne tombent pas sur la même page.

## Refonte au gabarit final, 19 octobre 2026

Commande : « Monte le reste du tome 1 final » ; le chapitre passe au gabarit à **sept sections** plus « En plus », sur
les modèles des ch. 4 et 12. Rédacteur (rôle 2). Aucun travail de source refait sur ce qui l'était déjà (JP, 19 octobre
2026 : « fuck les sources, on a pas déjà fait ce travail-là ? ») : tout chiffre nouveau vient d'une page déjà
enregistrée, recopiée dans `sources/13-refonte-2026-10-19-pyramide-et-en-plus.md` ; seule la photo de l'amadouvier
est nouvelle. Fins de ligne LF gardées (aucun CR). Rien d'autre touché que mes fichiers : le chapitre, cette fiche,
`sources/13-refonte-2026-10-19-pyramide-et-en-plus.md`, `sources/13-inaturalist-amadouvier-2026-10-19.json`, le
logigramme et ses rendus, `images/extras/13-amadouvier-bouleau.jpg` et son original.

### Ce qui a changé

- **La section 7 « DANGER » sort** ; la Variante d'urgence devient la **section 7**. Renvois internes suivis : « section
  8 » → « section 7 » (section 2, Matériel ×2, étapes 3, 5, 28, phrase après l'étape 17, section 6). Les étapes gardent
  leurs numéros (1 à 29) : aucun renvoi d'un autre chapitre n'est à refaire (ch. 12 : étapes 11 et 29 ; ch. 15 :
  étapes 1 à 7 ; les autres renvoient au chapitre sans étape ni section).
- **« Comment ça marche »** : déjà sorti le 16 octobre (section « Passe du 16 octobre 2026 (soir) » plus haut, morceau
  par morceau : étapes 2, 10, 12, 16). Rien à déplacer aujourd'hui.
- « ch. 11, section 9 » (étape 8, la mousse qui craque) → « ch. 11, section 7 » : la mousse qui craque est dans la
  variante d'urgence du ch. 11, qui devient la section 7 quand le ch. 11 passe au gabarit final. **Si le ch. 11 n'est
  pas migré dans la même passe, remettre « section 9 ».**
- Étape 8 : la première sous-étape dit maintenant où faire le feu (dehors, ou dans un poêle raccordé à son tuyau ;
  la tente à poêle, ch. 12) ; la deuxième prend un verbe (« Le faire à l'abri du vent… »).
- Étape 20 : les sous-étapes deviennent des phrases (majuscule, point), pour que le pictogramme ouvre une phrase.
- Étapes 22 et 23 : les appels de la planche 13-11 sortent (voir « Planches ») ; l'étape 23 dit avec quoi on fait le
  point (« avec une loupe ou une des lentilles de la section 7 »).
- Section 7, « Garder le feu » : **le feu en pyramide** ajouté comme autre façon, dehors (FM 3-05.70, § 7-17, déjà
  enregistré, `43b-us-army-fm3-05-70-survival-2002-texte.txt`). Le paragraphe du poêle perd son mécanisme (« le feu
  couve et le CO refoule dans la pièce ») : c'est la page `co` (« le poêle qu'on étouffe pour la nuit »).
- Section 7, l'amadouvier : « sur un bouleau mort » → « sur le tronc d'un bouleau, mort ou vivant » (RNCan, fiche
  183 : « sur les feuillus vivants et morts » ; `59-rncan-carie-blanche-spongieuse-amadouvier.md`). Le ch. 93 dit déjà
  la même chose.
- « Thuya » → « cèdre » (le mot du livre et de la page `thuyone`) dans la liste d'amadou et pour la planchette de l'arc
  à feu ; « (le thuya) » reste une fois entre parenthèses.
- Logigramme qb : la précision en liste devient une phrase (« Une vieille lime, un ressort ou une tête de hache, mais
  pas un couteau inoxydable »).

### Où est allé chaque bloc de l'ancienne section 7, Danger

| Bloc | Où il est allé | Ce qui saute, et pourquoi |
| --- | --- | --- |
| 1. Le feu dans un abri fermé | Étape 8, `{!co}`, première sous-étape : le feu dehors ou dans un poêle raccordé à son tuyau (ch. 12) ; jamais dans une tente, un abri de neige, une cabane de pêche ou la cabine d'un camion, « même pour se réchauffer vite » | Densité 0,96, sans odeur ni couleur, avertisseur entre 4,4 et 37,8 °C : dans la page `co`. La génératrice : page `generatrice`, aucune génératrice dans le chapitre. « Un appentis » sort de la liste : le ch. 12 fait le feu devant l'appentis ouvert |
| 2. Jamais d'accélérant | Étape 12, `{!vapeurs}`, dernière sous-étape : faire prendre le bois mouillé avec les copeaux en frisure et le bois gras, jamais avec de l'essence ni de l'allume-feu liquide ou en gel ; rien sur une braise ; jamais de bidon entre soi et le feu | La vapeur qui remonte jusqu'au bidon et le −43 °C : dans la page `vapeurs` |
| (hydrogène de la batterie, déjà à l'étape 20) | Étape 20, `{!vapeurs}`, troisième sous-étape | « un gaz explosif » : la page le dit ; le bac qui éclate et l'acide restent (propres au geste) |
| 3. La personne en hypothermie s'obstine | Étape 7, `{!froid}` : elle continue d'essayer d'allumer sans voir qu'elle doit arrêter ; l'autre adulte doit lui faire arrêter l'essai au bout de 10 minutes | 35 °C, 28 à 32,2 °C : dans la page `froid` |
| 4. La braise ne donne aucun repère pour cuire (74 °C, trichine, ch. 52) | Nulle part | Le chapitre n'a aucune étape de cuisson ; tout le bloc est dans les pages `cuisson` (74 °C, thermomètre, couleur, os et gras, « sur un poêle à bois, on ne connaît pas la chaleur ») et `trichine`. Pas de pictogramme sans étape. À confirmer par JP (question rendue) |
| 5. Le thuya ne va jamais dans une tisane | Section 7, « L'amadou qu'on ramasse », ligne du cèdre, `{!thuyone}` : « Le cèdre ne va jamais dans une tisane : pour la vitamine C, prendre les aiguilles de sapin baumier ou d'épinette (ch. 20) » | « La thuyone qu'il contient est toxique » : la page le dit ; le rappel du tableau de CLAUDE.md reste dit en une phrase là où on manipule le cèdre |

Le poêle étouffé pour la nuit (section 7, « Garder le feu ») reçoit aussi `{!co}` : c'est là que le danger se présente
(on garde le feu la nuit).

### Pictogrammes (étape → id)

| Où | Id |
| --- | --- |
| Étape 7 | `froid` |
| Étape 8 | `co` |
| Étape 12, dernière sous-étape | `vapeurs` |
| Étape 20, troisième sous-étape | `vapeurs` |
| Section 7, « Garder le feu », paragraphe du poêle | `co` |
| Section 7, « L'amadou qu'on ramasse », ligne du cèdre | `thuyone` |

Six pictogrammes, quatre ids, un par étape. Vérifié au montage d'essai (`build_chapitre.py`, sortie dans le
scratchpad) : co ×2, froid ×1, vapeurs ×2, thuyone ×1. Ne portent plus le ch. 13 : `generatrice`, `cuisson`,
`trichine` (inventaire à corriger, rendu à l'orchestrateur).

### Série orange

Inchangée : « Il faut un feu tout de suite, par grand froid » `{.orange 10 min}`, étapes 1 à 7, en tête de la section 4,
juste après le logigramme. Pastille : la durée de travail fin à mains nues au-delà de laquelle il faut réchauffer les
mains (CSST, *Travailler au froid !*, `17-cnesst-travail-au-froid.md`). Seul ajout : à l'étape 7, la phrase de
l'ancien danger 3 (l'autre adulte fait arrêter l'essai), qui est le geste de ces 10 minutes. Le doute du 16 octobre
reste : la pastille est le temps des mains, pas un temps compté depuis le déclencheur.

### Logigramme

`images/logigrammes/13-feu-sans-allumettes.json` : « section 8 » → « section 7 » (renvois et sources) ; u3 ne dit
plus « sortir l'amadou de sous ses vêtements » (l'étape 4 ne le dit plus depuis le 16 octobre : l'amadou se ramasse
avec le bois, étape 3) ; u2 dit « ramasser le bois et l'amadou… et de l'écorce de bouleau » ; qb, précision en
phrase. Pastille 10 min identique à l'orange. Colonnes de droite inchangées. Rendus : `env -u TMPDIR python3
design/outils/logigramme.py …json` (svg, pdf, png) et `… --sans-entete --svg` (`-livre.svg`) : **0 erreur, 0 avis**
les deux fois. Ancre inchangée : « **Eau, sable ou terre** », dernier item du Matériel.

### Planches

- Ancres de `placements-tome-1.json` (clé « 13 ») toutes intactes et uniques, chacune en début de paragraphe :
  13-40 (étape 10), 13-10 (étape 18), 13-07 (étape 25), 13-08 (boîte à braise), 13-09 (briquet à pierre), 13-01 (arc
  à feu), 13-11 (lentille de glace), la photo de l'écorce et de la gomme, le logigramme.
- **13-11 (la lentille de glace, petite planche)** : appelée seulement en section 7, là où son geste arrive (la
  lentille se fabrique là), repères 1 à 3 au paragraphe de la lentille, puis 4 à 6 à « La cible et le geste sont ceux
  des étapes 22 à 24 ». Avant, les étapes 22 et 23 appelaient les repères 4 à 6, pages avant l'ancre et dans l'ordre
  inverse des repères. `controle.py` compte donc un appel de moins (3 → 2) : voulu.
- Toutes les planches du chapitre sont encore dans `images/a-valider/` (aucune dans `validees/`) : le montage d'essai
  n'en trouve aucune (`planches: []`). Point 23 de la pause : 13-40 à refaire depuis zéro, les autres à faire valider.

### Chiffres nouveaux et leurs sources

| Chiffre | Où | Source (déjà enregistrée) |
| --- | --- | --- |
| Trois ou quatre rangs (feu en pyramide) | Section 7, « Garder le feu » | `43b-us-army-fm3-05-70-survival-2002-texte.txt`, § 7-17 |
| 12 000 et 3 000 coups de grattoir | En plus, étape 15 | `17-light-my-fire-tiges-ferrocerium.md` |
| 20 cm de haut, 30 ans et plus | En plus, l'amadouvier | `59-rncan-carie-blanche-spongieuse-amadouvier.md` |
| Plus de 5 000 ans | En plus, la pyrite | `37-wikipedia-pyrite-en.html` (3350 à 3105 av. J.-C.) |

Extraits recopiés dans `sources/13-refonte-2026-10-19-pyramide-et-en-plus.md`. Disparus avec la section Danger et
portés par les pages des dangers : 0,96 ; 4,4 et 37,8 °C ; −43 °C ; 35 °C, 28 à 32,2 °C ; 74 °C ; le renvoi au ch. 52.

### `[À VÉRIFIER]`

Un seul, inchangé : étape 8, le feu dont on a besoin pour se réchauffer quand le vent dépasse 20 km/h (« le plus
petit possible, derrière une butte, un rocher ou un mur de neige, et dégager plus large autour »). Aucune source ne
tranche entre la règle du vent et le besoin de chaleur. Le FM 3-05.70 (§ 7-6, déjà enregistré) appuie seulement le
mur de bûches ou de pierres qui coupe le vent et arrête les étincelles ; il ne dit rien du vent fort. À lever ou à
couper avant l'impression : question rendue à JP.

### Notes « En plus » (quatre)

| Note | Genre | Étape | Provenance |
| --- | --- | --- | --- |
| Quatre fois plus de coups avec la grosse tige | Fait | 15 | `17-light-my-fire-tiges-ferrocerium.md` (le chiffre retiré du Matériel le 27 septembre revient hors du geste) |
| La fumée d'amadouvier contre les moustiques | Façon des Métis : pourquoi ça marche (le champignon couve sans flamme et fume), ce qui la rend dangereuse (sous une toile, ce qui couve fait du monoxyde) | Section 7 | `30-uprety-2012-fichier-additionnel-1-texte.txt` (« Fruiting body burned to repell mosquitoes and flies [Metis: 13] ») ; page `co` |
| Reconnaître l'amadouvier | Photo | Section 7 | Texte : `59-rncan-carie-blanche-spongieuse-amadouvier.md`. Photo : iNaturalist 63794378, photo 102445923, « (c) scaup », CC BY ; `images/extras/13-amadouvier-bouleau.jpg` (original dans `extras/originaux/`), réponse de l'API dans `sources/13-inaturalist-amadouvier-2026-10-19.json` |
| La pyrite au lieu de l'acier | Fait | Section 7 | `37-wikipedia-pyrite-en.html` |

Aucune façon des Innus : aucune page déjà enregistrée ne décrit comment les Innus allumaient ou portaient le feu
(cherché dans `16c-turner-1894-…`, `80-turner-1894-…`, les fiches Nametau, Tipatshimuna, N360 et Uprety), et la
commande était de ne pas refaire de recherche. Trois notes renvoient à la section 7, sans numéro d'étape :
`chapitre.js` (placerNotes) les pose alors où il y a de la place, sans les rapprocher de la variante d'urgence.

### `controle.py`, avant et après

| | Avant (HEAD) | Après |
| --- | --- | --- |
| Mots (`controle.py`) | 5 588 | 5 624 |
| Mots (`wc -w`) | 5 497 | 5 534 |
| Tirets | 2 (titre et ligne de tome, lus par l'assembleur) | 2 (les mêmes) |
| « § », mots bannis, vocabulaire d'IA, tournures, maximes, pronominaux | 0 | 0 |
| Mots vides à juger | 23 | 22 (le « tout » de l'ancien danger 1 parti ; les autres portent le sens) |
| Redites à juger | 11 | 11 (les mêmes : un même mot pour la même chose, ou « souffler (étape 16) », un renvoi) |
| Invariants disparus | | 0,96, 4,4, 37,8 °C, 43 °C, 35 °C, 32,2 °C, 74 °C, ch. 52, génératrice, trichinellose : la section Danger, portée par les pages `co`, `vapeurs`, `froid`, `cuisson`, `trichine`, `generatrice`. Planche 13-11 : 3 → 2 appels, voulu (« Planches ») |

## Corrections après la vérification technique, 19 octobre 2026

Rédacteur (rôle 2), sur les quatre points du vérificateur technique. Aucune source cherchée de nouveau (JP, 19 octobre
2026 : « fuck les sources, on a pas déjà fait ce travail-là ? ») : rien de ce qui suit n'apporte un chiffre ou un fait
nouveau ; la licence de la photo se lit dans la réponse de l'API déjà enregistrée. Fichiers touchés : le chapitre, cette
fiche, le logigramme et ses rendus, `images/extras/13-amadouvier-bouleau.jpg`. Les fichiers communs (crédits, LISEZMOI
des extras, inventaire des dangers, page `vapeurs`) ne sont pas touchés : les changements sont rendus à l'orchestrateur.

| Point du vérificateur | Ce que j'ai fait |
| --- | --- |
| 1. Erreur : la photo de l'amadouvier n'a pas de ligne dans `images/credits.md` ni dans `images/extras/LISEZMOI.md` | **Appliqué, rendu à l'orchestrateur** (fichiers communs) : le bloc de crédits et la ligne du LISEZMOI, mot pour mot, dans le rapport. Licence relue dans `sources/13-inaturalist-amadouvier-2026-10-19.json` : photo 102445923, `cc-by`, « (c) scaup, some rights reserved (CC BY) » ; observation 63794378 en `cc0`, « research », New Glasgow (N.-É.), 28 octobre 2020. En passant : la copie qui s'imprime avait perdu le profil de couleur de l'original (Display P3) sans être convertie, donc des couleurs un peu ternes. Elle est refaite depuis l'original, convertie en sRGB (profil joint), 1 775 × 2 048, sans recadrage ni retouche, JPEG qualité 92 |
| 2. À préciser : la série orange et le logigramme disent « à l'abri du vent » sans dire « dehors » ; l'interdit du feu dans un abri fermé est à l'étape 8, hors de l'orange | **Appliqué, autrement que proposé.** Le vérificateur posait `{!co}` et « dehors ou dans un poêle » à l'étape 4 et gardait la liste des abris interdits à l'étape 8 : le même fait aurait été dit deux fois, avec deux pictogrammes, et l'orange aurait été redit plus loin (cadre : « Rien de l'orange ne se redit ailleurs » ; skill, « un fait garde une seule place »). J'ai **déplacé** tout l'ancien danger 1 dans l'étape 4 : `{!co}`, « Faire le feu dehors, ou dans un poêle raccordé à son tuyau (la tente à poêle : ch. 12) », puis « Dehors, le faire à l'abri du vent, et sur un lit de branches vertes s'il y a de la neige (étape 8) », puis la liste (tente, abri de neige, cabane de pêche, cabine d'un camion) et le mécanisme propre au chapitre (sans tuyau, le monoxyde du feu reste dedans). L'étape 8 perd son pictogramme et sa première sous-étape ; la suivante commence par « Dehors, faire le feu à l'abri du vent… », et la dernière sous-étape dit déjà quand faire le feu dans le poêle. Logigramme, u3 : « **Faire le feu dehors, à l'abri du vent, ou dans un poêle raccordé à son tuyau.** S'il y a de la neige, le faire sur un lit de branches vertes. » C'est le geste (où faire le feu), pas l'avertissement : celui-ci reste dans l'étape 4. Rendus : 0 erreur, 0 avis les deux fois ; la boîte tient sur deux lignes |
| 3. À préciser : le bloc du ch. 13 dans `plan/dangers-inventaire.md` demande encore 0,96, 4,4 à 37,8 °C, −43 °C, `cuisson` et `trichine` | **Appliqué, rendu à l'orchestrateur**, avec l'étape 4 au lieu de l'étape 8 pour `co`. `generatrice` sort du ch. 13 tout de suite : le tableau de `CLAUDE.md` l'applique au stock, au carburant et à l'électricité, et le chapitre n'a aucune génératrice (l'ancien danger 1 la nommait seulement en passant). `cuisson` et `trichine` attendent le oui de JP (question gardée) |
| 4. À préciser : la page `vapeurs` range le ch. 13 sous « l'éclairage » | **Appliqué tel quel, rendu à l'orchestrateur** (page commune) : « Le carburant (ch. 5, 15), le feu qu'on allume (ch. 13), l'éclairage (ch. 85), le propane, les batteries et l'atelier (ch. 103 à 112). » Vérifié : ch. 15 est « Se déplacer et le carburant », ch. 85 « Éclairage » |

### Pictogrammes, état au soir du 19 octobre (remplace le tableau « Pictogrammes » plus haut)

| Où | Id |
| --- | --- |
| Étape 4 (série orange) | `co` |
| Étape 7 (série orange) | `froid` |
| Étape 12, dernière sous-étape | `vapeurs` |
| Étape 20, troisième sous-étape | `vapeurs` |
| Section 7, « Garder le feu », paragraphe du poêle | `co` |
| Section 7, « L'amadou qu'on ramasse », ligne du cèdre | `thuyone` |

Vérifié au montage d'essai (`build_chapitre.py` importé avec `OUTD` dans le scratchpad, rien écrit dans
`design/epreuves-livre/`) : co, froid, vapeurs, vapeurs, co, thuyone, dans cet ordre. L'étape 8 n'a plus de
pictogramme.

### Le reste

- Ancres de `placements-tome-1.json` (clé « 13 ») : aucune ne touche les étapes 4 et 8 ; toutes encore présentes une
  seule fois, en début de paragraphe.
- Renvois d'autres chapitres : aucun à refaire (les étapes gardent leurs numéros ; ch. 12 → étapes 11 et 29, ch. 15 →
  étapes 1 à 7). Le « ch. 11, section 7 » de l'étape 8 est juste : le ch. 11 est migré, la mousse qui craque est dans
  sa section 7 (Variante d'urgence).
- `controle.py --avant` (HEAD) : 5 622 → 5 624 mots ; 2 tirets (titre et ligne de tome, lus par l'assembleur) ;
  0 « § », 0 mot banni, 0 tournure, 0 maxime, 0 pronominal ; 22 mots vides et 11 redites, les mêmes qu'avant, jugés
  (un « tout » qui veut dire tout, un renvoi « souffler (étape 16) ») ; invariants : rien n'a disparu.
- Le `[À VÉRIFIER]` de l'étape 8 (le feu pour se réchauffer quand le vent dépasse 20 km/h) reste : question à JP.
