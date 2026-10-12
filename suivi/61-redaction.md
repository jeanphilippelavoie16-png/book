> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 36. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Suivi de rédaction — Chapitre 36, Abattage, saignée, éviscération

- **Fichier :** `chapitres/36-abattage-saignee-evisceration.md`
- **Tome :** 3 — Prélever
- **Rôle :** 2, rédacteur
- **Date :** 2026-09-20
- **Statut proposé :** `RÉD` — en attente des portes 3 (technique) et 4 (sécurité)
- **Ampleur :** ≈ 4 600 mots utiles (5 823 mots bruts, tableaux compris). Procédure numérotée
  en 22 étapes, cinq tableaux, encadré DANGER à sept points, variante d'urgence complète avec
  son tableau de pertes.
- **Note du plan :** « Photos d'octobre — fenêtre unique ». **C'est le point critique de cette
  fiche.** Voir la section 2.

---

## 0. Ce qu'il faut savoir avant de lire le reste

**Le budget de recherche web du poste a été épuisé avant le début du travail** (200 appels
`WebSearch` sur 200). Toute la documentation du chapitre a donc été faite par **récupération
directe d'URL** (`WebFetch`), en partant des pages déjà au dossier et en descendant l'arbre de
Québec.ca page par page. Conséquence : les sources trouvées sont bonnes, mais **rien ne garantit
qu'une meilleure page n'existe pas ailleurs**. Trois sujets sont restés sans source pour cette
raison (voir §3). Un poste avec du budget de recherche doit refaire une passe sur ces trois-là.

**Trouvaille de navigation à conserver pour les ch. 41 à 52.** Les fiches de maladies de la
faune **ne sont pas sous `/faune/`**. Elles sont sous :

```
https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/
  sante-animale/maladies-animales/liste-maladies-animales/<maladie>
```

Adresses vérifiées le 2026-09-20 : `maladie-debilitante-chronique-cervides`, `echinococcose`,
`tularemie`, `rage-chez-les-animaux`. Quatre adresses plausibles sous `/faune/` ont répondu
404 avant de trouver celle-là. **Les rédacteurs des ch. 41, 44, 46, 48, 49, 51 et 52 partent
directement de cette liste.**

**Régression à signaler à l'éditeur.** Les deux adresses ACIA récentes de la fiche trichinose
(`/fr/sante-animaux/animaux-terrestres/maladies/declaration-obligatoire/...` et
`/declarations-obligatoires/...`) ont répondu **HTTP 410 Gone** le 2026-09-20. Seule l'adresse
longue conservée au dossier du ch. 22 reste. C'est exactement le scénario prévu par la règle 2
de `CLAUDE.md` : la citation est au dossier, donc le chiffre tient encore, mais **le lien va
mourir**. À revérifier avant impression pour les ch. 22, 36, 48 et 52.

**Gain pour le reste du livre.** La page MAPAQ sur la viande de gibier sauvage, déjà au dossier
pour les ch. 1, 7, 11, 12, 21, 24, a livré cette fois **huit phrases de procédure de terrain**
qui n'avaient jamais été captées : ne pas rincer à l'eau, enlever une couche de viande au
couteau propre, ne pas dépouiller en forêt, brancard ou suspension hors de portée des
prédateurs, branches sur le plancher du véhicule, retirer toute trace de matières fécales, ne
pas manipuler une bête d'apparence anormale, éviscération immédiate. **Les ch. 37 à 42 et 48
doivent repartir de `sources/36-mapaq-gibier-sauvage-chasseurs.md`, pas des fiches
antérieures.**

---

## 1. Les chiffres marqués `[À VÉRIFIER]`

| # | Valeur | Où dans le chapitre | Pourquoi elle n'est pas sourcée | Piste |
| --- | --- | --- | --- | --- |
| 1 | **≈ 200 kg de viande sur un orignal adulte** | §1 | Ordre de grandeur. Aucune page officielle consultée ne donne de rendement en viande pour l'orignal. Le chiffre sert à donner l'enjeu, pas à calculer | MELCCFP, fiches de biologie de l'orignal. Ou mesure de JP : peser les quartiers à la balance à ressort, une fois, et le livre a son chiffre à lui |
| 2 | **Température corporelle normale d'un cervidé** | §3, formulé comme « la température du corps » | Non retrouvée sur une page officielle. Le raisonnement du chapitre (le centre du cuissot est le point chaud et lent) tient sans elle | Manuel de médecine vétérinaire, ou biologiste de la faune. **Basse priorité** : le chapitre ne s'écroule pas sans |
| 3 | **Corde de 10 m, bâton écarteur « de la longueur de l'avant-bras »** | §4, tableau du matériel | Valeurs d'atelier, pas des valeurs publiées | À fixer à l'usage et à mesurer au chalet cet automne. Une fois mesurées, elles cessent d'être `[À VÉRIFIER]` et deviennent des chiffres du livre |

**Chiffres sourcés et fermes du chapitre** (ne pas les rouvrir sans source contraire) :
**7 °C en 24 heures** (MAPAQ) · **0 à 4 °C** au transport, à l'entreposage et au réfrigérateur
(MAPAQ) · **-18 °C ou moins** au congélateur (MAPAQ) · **74 °C** à cœur (MAPAQ) · **71 °C**
(ACIA, écart nommé et non caché) · **48 heures** suivant la sortie du lieu de chasse (Québec,
Faune) · **1 800 463-2191** SOS Braconnage (Québec, Faune) · **10 à 80 %** de mortalité du
tétanos et **2 semaines** d'incubation (Québec, MSSS).

**Aucune date de saison, aucune limite de prises, aucune zone** n'apparaît dans le chapitre.
Vérifié ligne par ligne.

---

## 2. Images requises — ⚠ FENÊTRE D'OCTOBRE, NE SE RATTRAPE PAS

Le suivi maître le dit : « Mi-octobre 2026 : photos du débitage. Manquée, la Partie IX attend
octobre 2027. » Les images 36-01 à 36-06 **ne peuvent pas être prises autrement que sur une
bête réelle, le jour de l'abattage**. Elles passent avant les images des ch. 37 à 42, parce
qu'elles sont les seules qui doivent être prises **avant** que la bête soit ouverte.

| # | Format | Sujet | Cadrage demandé | Source |
| --- | --- | --- | --- | --- |
| 36-01 | **Pleine page** | **L'image clé du chapitre.** La bête sur le dos, ouverte du bassin au sternum, viscères encore en place, avant le basculement du bloc | Plongée verticale depuis un escabeau ou une souche, la bête remplissant le cadre sur toute la hauteur. Lumière de jour, sans flash direct. **Un couteau posé en travers du bas du cadre sert d'échelle.** Prise avant que quiconque ait mis les mains dedans | Photo de JP. **Mi-octobre, une seule chance** |
| 36-02 | **Demi-page** | Séquence de l'ouverture en quatre vignettes : pincer la peau et glisser la pointe dessous ; les deux doigts en V de chaque côté de la lame ; la paroi abdominale qui s'ouvre sans force ; la ligature de l'œsophage | Même cadre, même distance, même angle pour les quatre. Serré sur les mains. **Gants jetables visibles sur toutes les vignettes** — la photo doit enseigner la règle de la §8 sans la répéter | Photo de JP. Mi-octobre |
| 36-03 | **Demi-page** | La carcasse suspendue par les jarrets, cavité ouverte et **écartée par le bâton en travers des côtes**, peau encore en place | Frontal, recul suffisant pour prendre la perche et le sol dans le cadre, contre-jour évité. L'écarteur doit être clairement lisible : c'est le détail que tout le monde oublie | Photo de JP. Mi-octobre |
| 36-04 | **Quart de page** | Sonde du thermomètre plantée au centre du cuissot, affichage lisible, avec l'heure notée au crayon sur un ruban collé à côté | Macro sur l'afficheur, cuissot net en second plan. **Prendre la série complète : 2 h, 6 h, 24 h**, même cadre chaque fois. Les trois valeurs réelles deviennent un tableau du ch. 68 | Photo de JP. Mi-octobre |
| 36-05 | **Quart de page** | Le coupon de transport apposé sur l'animal, numéro unique lisible | Macro, lumière rasante, numéro net à l'impression. **Flouter ou masquer le numéro réel au montage** — il ne se publie pas | Photo de JP. Mi-octobre |
| 36-06 | **Quart de page** | Le bloc de viscères sorti, posé à l'écart de la carcasse, avec le gras périrénal détaché et mis de côté sur un linge propre | Plongée à 45°, le gras clairement séparé du reste dans le cadre. Une main gantée dans le champ pour l'échelle. Sert aussi au ch. 24 et au ch. 67 | Photo de JP. Mi-octobre |
| 36-07 | **Demi-page** | Planche dessinée : coupe schématique de la cavité, avec les deux points de ligature (œsophage en haut, rectum en bas) et la ligne d'ouverture de la paroi | Planche à dessiner, pas une photo — l'anatomie ne se lit pas sur une photo de terrain. Ligne d'ouverture en rouge, ligatures marquées par un symbole répété au ch. 37 | À dessiner. Hors fenêtre d'octobre |
| 36-08 | **Quart de page** | Planche dessinée : les deux horloges côte à côte — 24 h sanitaire depuis la mort, 48 h légale depuis la sortie du bois, décalées volontairement | Planche à dessiner. Deux cadrans ou deux barres, points de départ visiblement différents. C'est l'idée la plus mal comprise du chapitre | À dessiner. Hors fenêtre d'octobre |

**Note pour `images/credits.md` :** aucune image versée. Six photos de JP à prendre, deux
planches à dessiner. **Aucune photo d'éviscération ne se prend sur le web** : les licences
Wikimedia Commons sur ce sujet sont rares, et une photo de cervidé étranger montrerait une
autre anatomie.

**Liste de rappel à coller dans le coffre du camion avant la chasse :** 36-01, 36-02, 36-03,
36-04 (trois prises), 36-05, 36-06. Plus les images d'octobre des ch. 24 (deux os sciés en
long), 38, 39 et 40.

---

## 3. Les trois trous de documentation

| Question | État | Qui tranche |
| --- | --- | --- |
| **La saignée** | **Aucune source officielle retrouvée.** Aucune des pages consultées ne prescrit ni ne décrit la saignée. Le MAPAQ parle d'éviscération et jamais de saignée. Ce que dit l'étape 8 du chapitre vient de la pratique et c'est écrit tel quel à la §10 | **Question n° 1 au relecteur.** Un chapitre qui s'appelle « saignée » et qui n'a pas de source sur la saignée, c'est le genre de chose que l'éditeur doit voir avant l'impression. Deux issues possibles : trouver la source, ou retirer le mot du titre |
| **Un organe porteur de kystes** | Le Québec décrit l'échinococcose et les kystes chez les cervidés, mais **ne dit pas** si la viande d'une bête porteuse reste consommable ni s'il faut écarter la carcasse | **Question n° 2 au relecteur.** Vétérinaire de la faune, ou MAPAQ. C'est la question que JP se posera à sa première éviscération |
| **Durée de suspension avant débitage, rassissement** | Rien dans aucune source consultée | Renvoyé au ch. 68. **Ne rien chiffrer avant.** Le thermomètre enregistreur de la cave, déjà prévu au suivi maître, donnera la moitié de la réponse |

---

## 4. Renvois vers d'autres chapitres

| Chapitre | Raison du renvoi |
| --- | --- |
| 19, 20 | L'enregistrement en ligne exige un réseau qu'un chalet hors réseau n'a pas |
| 21 | Coupons, groupe de chasse, partage de la viande, étiquette espèce-chasseur-date |
| 22 | L'arme déchargée et rangée dès que le couteau sort |
| 24 | Le gras récupéré à l'éviscération ou perdu — c'est le remède au mal de caribou |
| 27, 29 | Coupure, tétanos, trousse |
| 37 | La carcasse ouverte et refroidie est le point de départ de la carte |
| 38, 39, 40 | Les quartiers, après ce chapitre |
| 41 | Abats et organes, cadmium du foie et des reins de cervidés |
| 42 | Où porter le bloc de viscères, à quelle distance du camp |
| 44, 46, 48, 49, 52 | Fiches d'espèce : tularémie, giardia, trichinellose |
| 61 | Pourquoi la viande pourrit — le mécanisme derrière le 7 °C |
| 63, 65, 66 | **Filière fermée si le 7 °C est manqué.** Point à faire respecter par l'éditeur |
| 68 | Froid naturel, suspension, rassissement |
| 69 | Le congélateur qui dégèle |
| 79 | La peau, si elle n'a pas servi de nappe |
| 82 | Affûtage — une lame émoussée perce les intestins |
| 86 | Poulies, mouflage, levage de la carcasse |

**Renvois reçus attendus :** les ch. 37 à 42 commencent tous là où celui-ci s'arrête. Le ch. 34
(calendrier) doit pointer vers la fenêtre d'octobre.

---

## 5. Relecteur humain

**Non obligatoire** selon la liste de `CLAUDE.md` — le ch. 36 n'y figure pas.

**Recommandé quand même**, et le chapitre le dit à sa §10 : un technicien de la faune du
MELCCFP ou un moniteur du cours d'initiation à la chasse, sur trois points seulement :

1. La séquence d'ouverture, étapes 9 à 13 — c'est de la technique de terrain, pas de la
   réglementation, et aucune source ne la couvre.
2. Ce que le chapitre dit de la saignée (question n° 1).
3. La conduite à tenir devant un organe anormal (question n° 2).

Les obligations de relecture humaine restent portées par les ch. 41 (cadmium), 44 (tularémie)
et 48 (trichinellose), qui sont sur la liste.

---

## 6. Points à surveiller aux portes 3 et 4

**Vérificateur technique :**
- Les huit citations MAPAQ nouvellement captées sont-elles bien reproduites mot à mot ?
- L'étape 8 (saignée) est-elle présentée assez clairement comme non sourcée ?
- Le tableau du matériel marque trois items « non négociables » de plus que les autres
  chapitres. Est-ce justifié, ou est-ce de la dilution ?

**Vérificateur sécurité :**
- **L'encadré DANGER a sept points. C'est beaucoup.** Chacun porte un risque de mort ou
  d'intoxication grave et chacun donne son mécanisme, mais la règle anti-dilution s'applique
  aussi à l'intérieur de l'encadré. Si un point doit sauter, le candidat est le n° 6 (MDC),
  parce que la transmission à l'humain n'est pas démontrée — mais le mécanisme « la cuisson ne
  détruit pas le prion » est justement ce qui le rend nécessaire, puisqu'il est le seul danger
  du chapitre que le thermomètre ne couvre pas. **Décision à prendre, pas à repousser.**
- Vérifier que le point 1 (bête pas morte) est bien le premier. C'est le seul danger qui tue
  dans les cinq minutes qui suivent.
- Le point 7 (le gras jeté) est un danger à retardement dans un encadré de dangers immédiats.
  Assumé, parce que le geste se fait ici et nulle part ailleurs. À confirmer.

## Notes retirées du chapitre — 23 septembre 2026

- §5, étape 8 (La saignée), en tête d'étape : « Aucune source officielle québécoise ne la décrit — le MAPAQ parle d'éviscération et jamais de saignée. Ce qui suit est de la pratique, pas une consigne. » Provenance à garder ici : toute l'étape 8 repose sur la pratique, sans source officielle.

## Passe légal et signes — 23 septembre 2026

**Légal retiré (règle « pas de municipalité, pas de code légal ») :**
- §5 ancienne étape 4 « Marquer la bête avant de la toucher » (ce que la réglementation de
  l'année demande d'apposer) : coupée. Le mécanisme qu'elle portait (mains encore propres et
  sèches ; après l'ouverture, plus rien n'est ni sec, ni lisible, ni collable) passe à l'étape de
  l'heure de la mort, qui devient l'étape 4. Les étapes 5 à 21 sont renumérotées 4 à 20 (aucun
  renvoi par numéro d'étape vers ce chapitre, vérifié dans chapitres/ et suivi/).
- §6 : ligne « Dans la minute | Bête marquée, mains encore propres » : coupée.
- §5 étape 18 (ancienne 19) : « Ce que la réglementation de l'année demande de garder attaché à
  la bête — tête, quartiers, peau, pattes — se décide avant la première coupe » : coupée.
- §9, tableau « Ce qu'on perd » : ligne « Ce qui doit rester attaché à la bête » (la
  réglementation de l'année dit ce qui se transporte avec quoi) : coupée.
- Doute de la passe paperasse (ligne 36, « l'étape 4 et le §6 Bête marquée ») : tranché, coupé.

**Notes de bas de page ajoutées :**
- [^1], §5 étape 14 : **kystes** (échinococcose) — boules blanches, rondes, à paroi épaisse,
  liquide clair, bille à balle de golf (quelques mm à 15 cm), surtout poumons, parfois foie.
  Provenance : `sources/36-rcsf-kystes-hydatiques-gibier.md` (Centre canadien coopératif de la
  santé de la faune, bulletin 2-3, 1994) et `sources/36-adfg-kystes-hydatiques.md` (Alaska
  Department of Fish and Game : paroi épaisse, liquide clair, surtout poumons).
- [^2], §5 étape 19 : **ce qu'on surveille deux semaines** (tétanos) — crampes et raideurs
  soudaines, cou puis visage. Provenance : `sources/36-quebec-tetanos-et-zoonoses.md`, extrait
  « Premiers symptômes » (Québec.ca, tétanos), déjà enregistré.
- [^3], §8 point 7 : **mal de caribou** — même note qu'aux ch. 38 et 51. Provenance :
  `sources/36-mal-de-caribou-signes.md` (copie de `38-mal-de-caribou-signes.md`). Aucune source
  officielle ne décrit le tableau : le délai porte `[À VÉRIFIER]`.

**Doutes de la passe paperasse laissés tels quels :** §9 colonne d'heures, étape 18 (lectures
de sonde), étiquette du quartier, citations sans organisme — ni légal, ni signe.

## Levée des [À VÉRIFIER] — 24 septembre 2026

Verdicts de `suivi/verifications/36-verifications.md`, appliqués au chapitre.

- §1 En une ligne, **200 kg de viande** d'un orignal : confirmé comme ordre de grandeur (au plus
  227 kg de viande par bête en moyenne en Alaska ; mâle québécois 329 à 635 kg vivant). Phrase
  précisée : « les quelque 200 kg de viande d'un orignal ». Provenance :
  `sources/36-adfg-orignal-viande-recoltee.md`, `sources/86-quebec-orignal-poids.md`.
- §3 Pourquoi ça marche, **température du corps** : aucune valeur → **près de 39 °C**
  (température rectale de l'orignal 38,4 à 38,9 °C, 38,8 °C en moyenne sur 15 adultes en
  septembre). Provenance : `sources/36-rangifer-arnemo-1995-temperature-orignal.md` (+ `.pdf`).
- §4 Matériel, **corde de 10 m** : introuvable pour l'orignal (seule longueur trouvée : 4,6 m pour
  un cerf ou un wapiti, sans palan). Chiffre retiré ; la longueur se dit par le mouflage à trois
  brins (trois fois la hauteur à monter, plus l'amarrage et la prise). Provenance :
  `sources/36-csu-extension-soin-gros-gibier.md`.
- §4 Matériel, **écarteur de la longueur de l'avant-bras** : introuvable (fonction confirmée,
  aucune longueur). Mesure retirée ; le bâton se coupe à la largeur de la cavité ouverte.
  Provenance : `sources/36-csu-extension-soin-gros-gibier.md`.
- §8 note [^3], **délai de la diarrhée** (mal de caribou) : « vers la fin de la première
  semaine » → **au bout d'une semaine à dix jours**, que rien n'arrête sauf le gras. Provenance :
  `sources/21-speth-spielmann-1983-stefansson-mal-de-caribou.md` ;
  `sources/36-mal-de-caribou-signes.md` (7 à 10 jours, concorde).

## Les armes de JP — 24 septembre 2026 : vérifié, rien à changer

Consigne de JP : aligner le livre sur ses armes (12, .22, 7 mm Remington Magnum, deux .308
Winchester, .303 British). Le chapitre a été relu pour tout calibre ou type d'arme nommé pour
l'orignal : il n'en nomme aucun. Il parle de « l'arme chargée et prête » (étape 2), du « coup de
grâce » (étape 3) et de fragments de projectile (étape 15), ce qui vaut pour les quatre carabines
comme pour le 12 à balle unique. Le seul « fusil » du chapitre est le fusil à aiguiser (§4).
**Aucune modification.** Les calibres de l'orignal sont nommés au ch. 35b (§5-A).

Compression §3 et §4 — 27 septembre 2026 : 1375 mots → 198 mots (§3 : 569 → 113 ; §4 : 806 → 85) ; matériel coupé : gants jetables (étape 6, §8 point 4, §9), gants de travail, poulies (guindeau en §9, ch. 109 à l'étape 16), écarteur (taillé sur place, étape 16), scie à os (hachette à l'étape 10), sacs à quartiers (jamais de plastique sur la viande : §9 étape 8), lampe frontale, eau et savon (jamais pour la carcasse : étapes 1, 15 et 19), trousse de premiers soins (étape 19), crayon et ruban (étape 4), étiquettes (étape 20), substituts du thermomètre (§9, « Mesurer sans sonde »). §3 : six paragraphes ramenés à quatre phrases ; exemples coupés (camion à -5 °C, groupe monté pour la semaine), chiffres 39 °C et 7 °C en 24 h retirés (déjà aux étapes 4, 17 et en §6). Rien à déplacer, aucune note ni renvoi touché.
