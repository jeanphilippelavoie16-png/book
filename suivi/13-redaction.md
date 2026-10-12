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
