# Vérification technique : Chapitre 4, Retombées radioactives

- **Rôle :** 3, vérificateur technique (n'a pas rédigé le chapitre, ne le réécrit pas)
- **Date :** 18 octobre 2026
- **Texte vérifié :** `chapitres/04-retombees-radioactives.md` tel qu'il est le 18 octobre 2026 (refonte au gabarit à
  sept sections, commit 7a183b0), contre `suivi/04-redaction.md` (section « Refonte au gabarit à sept sections ») et
  les fichiers de `sources/` qu'elle cite (`04-…`, `06-…`, `sources/autochtones/`).
- **Logigramme :** `images/logigrammes/04-retombees.json`.
- **Planches :** légendes lues dans `images/planches-src/04-01b.js` ; ancres dans
  `design/epreuves-livre/placements-tome-1.json`.
- **Pages des dangers :** `dangers/partie-1.md`, `dangers/partie-2.md` ; `plan/dangers-inventaire.md`, sections 1 et 3.
- **Sources nouvelles enregistrées** (fiche maître : `sources/04-verification-technique-2026-10-18.md`) :
  - `04-aiea-trs472-2010-transfert-terre-eau-douce.pdf` (AIEA : poisson d'eau douce, sol, lait, cuisson des os) ;
  - `04-aiea-trs422-2004-facteurs-concentration-mer.pdf` (AIEA : poisson de mer) ;
  - `04-japon-moe-2018-poisson-mer-et-eau-douce.pdf` (Japon : poisson de mer et d'eau douce après Fukushima) ;
  - `04-japon-moe-2013-lignes-directrices-decontamination-extraits.pdf` (Japon : où la pluie concentre la poussière) ;
  - `04-japon-moe-2021-mesurer-les-aliments-extraits.pdf` (Japon : avec quoi on mesure un aliment) ;
  - `04-aiea-2006-tchornobyl-environnement-titre.pdf` et `…-p33-34-texte.txt` (AIEA : le césium d'une centrale
    lointaine se dissout) ;
  - `04-fda-2004-ki-duree-de-conservation.pdf` (FDA : l'iodure de potassium ne se dégrade pas) ;
  - `04-remm-hhs-decontamination-externe.html` (HHS : se décontaminer sans eau) ;
  - `04-retromanufacturing-fils-poste-auto.html` (fabricant : les fils d'un poste d'auto).
  Les passages nouveaux de l'ORNL (pompe à volets, neige, pluie, sable) sont recopiés dans la fiche maître, avec
  leur page ; la copie du livre est `06-ornl-kearny-nwss-1987.pdf`.

**Bilan :** environ 150 valeurs, faits et mécanismes vérifiés dans le texte, les tableaux, la note, les encadrés
En plus et le logigramme. **8 erreurs** (section 1), **19 points à préciser** (section 2), **le reste confirmé**
(section 6, 46 lignes). Les quatre `[À VÉRIFIER]` : un confirmé (le poisson du fleuve), un confirmé et précisé
(étape 26), une erreur (la pompe à carton), une coupe (le ruban adhésif). Les deux contradictions : le ch. 4 a
raison les deux fois, avec une réserve sur l'eau (section 4). Pictogrammes : les huit existent et le ch. 4 est inscrit
dans leur colonne ; deux pages de danger donnent un geste que l'abri interdit ; un rappel du tableau de `CLAUDE.md`
manque (botulisme de type E, poisson).

---

## 1. Erreurs (le texte dit faux)

### E1. Étape 9, Points de contrôle, logigramme : la maison de bois, partir avant 30 minutes, pas arriver

- **Texte :** étape 9, « et y être rendu au plus tard 30 minutes après l'éclair » ; Points de contrôle, « Arrivé dans
  un meilleur abri […] | Avant la 30e minute après l'éclair » ; logigramme, nœud « changer », « **Y aller**, et y
  être rendu au plus tard 30 min après l'éclair. »
- **Source :** FEMA 2022, p. 67 (`06-fema-2022-detonation-nucleaire-extraits.pdf`, texte vérifié dans le PDF) :
  « When adequate shelters are nearby (within 15 minutes travel time), people in poor-quality shelters (protection
  factors = 2) should stay there no longer than 30 minutes from the detonation. » La FEMA fixe l'heure du **départ**
  du mauvais abri ; avec 15 minutes de trajet, on arrive jusqu'à 45 minutes après l'éclair. Le texte avance le départ
  jusqu'à 15 minutes plus tôt que l'heure que la FEMA calcule.
- **Correction proposée :**
  - Étape 9 : « **Dans une maison de bois sans sous-sol, changer d'abri si un meilleur est à moins de 15 minutes**,
    et partir au plus tard 30 minutes après l'éclair : un sous-sol, ou un gros bâtiment de béton ou de brique. »
  - Points de contrôle : « | Minute 30, maison de bois sans sous-sol | Parti vers un meilleur abri, s'il y en a un à
    moins de 15 minutes (étape 9) | Avant la 30e minute après l'éclair | Rester et empiler la masse (section 7) | »
  - Logigramme, nœud « changer » : « **Y aller**, et partir au plus tard 30 min après l'éclair. »

### E2. Étape 11 : le délai de l'iode ne se compte pas depuis l'alerte

- **Texte :** « **Écrire au crayon l'heure de l'éclair ou de l'alerte sur le cadre de la porte de l'abri.** Le délai
  de l'iode et les 24 heures d'abri se comptent à partir de cette heure-là. » Logigramme, nœud « Écrire l'heure… » :
  « le délai de l'iode et les 24 h d'abri se comptent de là. »
- **Source :** OMS 2025 (`04-oms-2025-iodure-de-potassium.md`) : « moins de 24 heures avant et jusqu'à 2 heures après
  le début prévu de l'exposition […] jusqu'à 8 heures après l'exposition […] plus de 24 heures après l'exposition
  n'offrira aucune protection. » L'étape 14 le dit elle-même (« le début de l'exposition, c'est-à-dire l'arrivée du
  panache ou des retombées »), et le logigramme aussi (« Ça fait moins de 24 h depuis l'arrivée des retombées ? »).
  Après une alerte de centrale, le panache peut arriver des heures plus tard : en comptant depuis l'alerte, on cesse de
  donner l'iode alors qu'il protège encore.
- **Correction proposée :**
  - Étape 11 : « **Écrire au crayon l'heure de l'éclair ou de l'alerte sur le cadre de la porte de l'abri, et,
    dessous, l'heure où les retombées ont commencé à tomber ou celle que la radio donne pour l'arrivée du
    panache.** On compte les 24 heures d'abri à partir de l'éclair, et le délai de l'iode à partir de l'arrivée des
    retombées ou du panache (étape 14). »
  - Points de contrôle, ligne « Heure 24 » : « 24 h depuis l'heure de l'éclair écrite sur le cadre de porte ».
  - Logigramme, nœud « Écrire l'heure… » : « **Écrire l'heure de l'éclair ou de l'alerte**, puis celle de l'arrivée
    des retombées, sur le cadre de la porte. »

### E3. Section 7, « La pompe à carton » (`[À VÉRIFIER]`) : un battant sans volets ne pompe pas

- **Texte :** « Assis, tirer la corde d'un coup, puis la relâcher (repère 5) : relâché, le battant retombe contre la
  latte (repère 6). À chaque coup, le battant pousse de l'air dans la pièce [À VÉRIFIER]. » ; « Clouer des lattes en
  butée derrière le battant » ; « tendre dessus un filtre de fournaise neuf, ou un linge humide ».
- **Source :** ORNL, chap. 6, p. 50 : « I called it a Punkah-Pump, because its hand-pulled operation is somewhat like
  that of an ancient fan called a "punkah" […]. (Unlike the punkah, however, this air pump can force air to move in a
  desired direction and is a true pump.) » Annexe B, p. 194 et 195 : « its flaps are closed by air pressure and it
  pushes air in front of it […] When a KAP swings freely back as a pendulum on its return stroke, all its flaps are
  opened by air pressure […]. Thus the flaps are one-way valves that operate to force air to flow in one direction ».
  Un panneau plein pousse l'air à l'aller et le ramène au retour : c'est le punkah, qui brasse l'air sans le faire
  passer. Les « lattes en butée » du chapitre sont une lecture des ficelles qui arrêtent les volets (« flap-stops »).
  Le filtre : ORNL, annexe E, p. 271, « bath towel cloth will serve » (serviette sèche ; rien sur un linge humide, qui
  freine plus l'air). Toutes les citations : `sources/04-verification-technique-2026-10-18.md`, section 5.
- **Correction proposée** (remplace le titre et les puces de « La pompe à carton », jusqu'à « loin de la porte. » ;
  les repères suivront la planche refaite) :

  > **La pompe à volets** : on la pend dans le haut de la porte de la pièce d'abri, et on la fait marcher à la main,
  > sans électricité (planche 04-01b). Un panneau plein qui bat dans la porte ne fait que brasser l'air : il le pousse
  > à l'aller et le ramène au retour. Les volets de la pompe se ferment à l'aller et s'ouvrent au retour, et l'air
  > avance dans un seul sens.
  >
  > - Faire un cadre de lattes, ou de bâtons de 3 cm liés avec des bandes de tissu, 2,5 cm plus étroit que
  >   l'ouverture. Le doubler : un cadre trop léger ne revient pas assez loin tout seul.
  > - Le pendre par le haut, à deux pentures ou à des boucles de cuir ou de corde, sur une planche clouée en travers
  >   du haut de la porte. Le cadre doit passer à environ 1 cm du seuil et à 1 à 2,5 cm des côtés.
  > - Tendre des ficelles en travers de la face du cadre tournée vers la pièce : elles arrêtent les volets.
  > - Tailler les volets dans un grand sac à ordures, 9 cm de large. Replier un ourlet sur le haut de chacun, le fermer
  >   au ruban, et y enfiler un fil de cintre redressé.
  > - Fixer les fils de cintre en travers du cadre, tous les 7,5 cm, devant les ficelles, du côté de la pièce : chaque
  >   volet doit tourner librement et couvrir un peu celui du dessous.
  > - Nouer la corde au cadre, un peu sous les pentures. Assis dans la pièce, tirer la corde jusqu'à ce que le cadre
  >   monte presque à l'horizontale : les volets se plaquent contre les ficelles et poussent l'air vers soi. Lâcher la
  >   corde pendant tout le retour : le cadre revient seul, les volets s'ouvrent et l'air continue d'avancer.
  > - Pendre la pompe dans l'ouverture par où l'air entre déjà.
  > - À l'entrée d'air, tendre sur un cadre de lattes un filtre de fournaise neuf, ou deux épaisseurs de serviette de
  >   bain, sur la plus grande surface possible : un petit filtre étouffe la pompe.
  > - Une pompe de 60 cm de haut suffit pour quelques personnes ; par temps froid, elle suffit pour plus.

  À faire en même temps : l'ancre de la planche 04-01b (`"apres": "**La pompe à carton** : on la monte dans la porte
  de la pièce d'abri"`) devient « **La pompe à volets** : on la pend dans le haut de la porte de la pièce d'abri ».
  **La planche 04-01b est à refaire** sur l'annexe B de l'ORNL (fig. 1, 2, 11, 13 et 21 du livre de Kearny) : cadre,
  ficelles, volets sur leurs fils, sens du coup et du retour ; ses repères 3, 6, 7 et 9 (lattes en butée, « il ne bat
  que d'un côté ») et 11 (« linge humide ») dessinent le punkah.

### E4. Matériel, section 6, section 7 : un dosimètre ou un compteur Geiger ne dit pas si la viande est chargée

- **Texte :** Matériel, « **Dosimètre ou compteur Geiger** : le seul appareil qui dit si le gibier, le poisson et le
  lichen sont chargés » ; section 6, « Seul un compteur mesure le césium » ; section 7, électroscope, « pour elle, il
  n'y a qu'un compteur ».
- **Source :** Japon, MOE 2021 (`04-japon-moe-2021-mesurer-les-aliments-extraits.pdf`) : « To measure radioactivity
  concentrations in foods and soil, measuring instruments wherein a germanium detector (Ge detector) or a NaI (Tl)
  detector that can measure γ-ray spectra is installed in a lead shield are used. » Le même livret range les
  dosimètres parmi les appareils qui mesurent la dose reçue par la personne. Ce que le compteur fait au chalet, c'est
  ce que la section 7 demande à l'électroscope : le rayonnement de la pièce et du dehors, et sa baisse.
- **Correction proposée :**
  - Matériel : « **Compteur Geiger ou dosimètre à affichage** : dit le rayonnement dans la pièce et dehors, et quand il
    a assez baissé pour sortir (sans compteur : section 7). »
  - Section 6, ligne du gibier, colonne Action : « Le césium d'une viande se mesure au laboratoire, avec un détecteur
    blindé de plomb ; au chalet, on ne peut pas le mesurer. Faire tremper, jeter le bouillon et s'en tenir aux bêtes
    les moins exposées (étapes 29 à 32). »
  - Section 7, électroscope, « Ce qu'on perd » : « …et c'est la question des années suivantes : pour elle, il faut
    l'appareil d'un laboratoire. »

### E5. Section 6 : un comprimé d'iode périmé reste bon

- **Texte :** « | Comprimés d'iode friables, décolorés ou périmés | Gardés hors de 15 à 30 °C, ou trop vieux | Ne pas se
  fier au reste de la plaquette : un comprimé abîmé n'a plus une dose connue | »
- **Source :** FDA 2004 (`04-fda-2004-ki-duree-de-conservation.pdf`) : « none of the components of KI tablets,
  including the active ingredient, has any significant potential for chemical degradation […] when stored according
  to labeled directions » ; un comprimé qui se dissout mal « would remain usable », à écraser dans une boisson ; « a
  yellowish discoloration would be indicative of stability problems » ; « pure KI is known to be very stable (as long
  as it is protected from moist air) ». Le texte fait jeter un comprimé seulement périmé, alors que c'est souvent le
  seul qu'une famille aura.
- **Correction proposée :** « | Comprimés d'iode jaunis, ou mouillés par une plaquette ouverte | L'humidité de l'air
  les a abîmés | Un comprimé jauni n'a plus une dose sûre. On peut donner un comprimé intact, seulement périmé, resté
  dans sa plaquette fermée : l'iodure de potassium ne se dégrade pas. S'il fond mal, l'écraser dans la boisson
  (étape 15) | »

### E6. Section 6 : l'entrée d'air du poêle se débouche du côté du vent

- **Texte :** « | Poêle qui tire mal, fumée qui revient dans l'abri | Le bouchage a coupé l'air du poêle | Déboucher
  une entrée d'air du côté opposé au vent | »
- **Source :** RNCan, *Le guide du chauffage au bois résidentiel*, p. 40 (`16c-rncan-refoulement-braise-effet-de-tirage.md`) :
  « Ils ouvrent une fenêtre qui est située au même étage que l'appareil et du côté du vent pour rééquilibrer la
  pression ». Une ouverture sous le vent met la maison en dépression et aggrave le refoulement. Le ch. 12 suit la même
  source (entrée d'air « du côté du vent »). La poussière qui entrerait : ORNL, annexe B, p. 194 (l'air lent n'en
  apporte qu'une « very small fraction ») et annexe E (filtre de fournaise).
- **Correction proposée :** « | … | … | Ouvrir une entrée d'air au même étage que le poêle, du côté d'où vient le vent,
  et tendre dessus un filtre de fournaise ou deux épaisseurs de serviette de bain | »

### E7. Étape 22 : la neige qui était au sol a reçu la poussière

- **Texte :** « un lac, un ruisseau, un baril de pluie et la neige tombée pendant ou après le passage ne le sont pas. »
- **Source :** ORNL, chap. 8, p. 72 : « Water obtained by melting snow that has fallen through air containing fallout
  particles, or from snow lying on the ground onto which fallout has fallen. Avoid using such water for drinking or
  cooking ». L'hiver, la neige qu'on fait fondre est celle qui était au sol ; le texte ne la nomme pas, et le
  critère « tombée après le passage » n'est pas dans la source.
- **Correction proposée :** « Au chalet, un puits tubé et fermé est protégé ; un lac, un ruisseau, un baril de pluie,
  la neige qui était au sol quand les retombées sont tombées et la neige tombée pendant le passage ne le sont pas. »

### E8. Section 7, le poste d'auto : il faut les deux fils d'alimentation

- **Texte :** « Brancher le fil d'alimentation jaune ou rouge au positif d'une batterie d'auto, et la masse au
  négatif. »
- **Source :** Retro Manufacturing, « Wiring Your Radio » (`04-retromanufacturing-fils-poste-auto.html`, page de
  fabricant) : « Yellow wire 12 volts constant · Red wire 12 volts ignition/accessory · Black wire ground. If you do not
  connect ALL of these wires the radio WILL NOT work. » Le jaune seul n'allume pas le poste ; sur un poste d'origine,
  les couleurs ne suivent pas ce code.
- **Correction proposée :** « Brancher ensemble les deux fils d'alimentation au positif d'une batterie d'auto, et la
  masse au négatif. Sur un poste de remplacement, ce sont le fil jaune et le fil rouge, et la masse est noire. Sur un
  poste d'origine, les couleurs changent d'une auto à l'autre : avant de le sortir, chercher au multimètre le fil qui
  garde 12 V clé enlevée et celui qui n'a 12 V que clé tournée. »

---

## 2. À préciser

### P1. Étape 26 (`[À VÉRIFIER]`) : confirmé, et les lieux sont à compléter

- **Texte :** « La pluie entraîne la poussière du toit et du terrain vers les gouttières, les fossés et les creux où
  l'eau s'accumule [À VÉRIFIER] : ne pas y jardiner, et ne pas y laisser jouer les enfants. »
- **Source :** Japon, MOE, *Decontamination Guidelines*, 2013, p. 68 du PDF
  (`04-japon-moe-2013-lignes-directrices-decontamination-extraits.pdf`) : « Examples of hotspots include depressed
  areas and puddles, street drains, under rainwater guttering, rainwater chambers, under or near trees, or in places
  where raindrops falling from buildings land, as radioactive materials tend to become concentrated in such places due
  to rainwater » ; p. 80 : « Sediment in downspouts (especially bend sections) tends to get overlooked ». ORNL, p. 72 :
  le ruisseau est « especially dangerous if the stream is muddy from the first heavy rains after fallout is
  deposited. The first runoff will contain most of the radioactive material that can be dissolved ».
- **Correction proposée :** « La pluie entraîne la poussière du toit et du terrain vers les gouttières et le bas des
  descentes, l'endroit où l'eau tombe du toit, les fossés, les flaques et les creux, et le pied des arbres : ne pas y
  jardiner, et ne pas y laisser jouer les enfants. Le ruisseau qui coule boueux après les premières grosses pluies
  est le plus chargé : ne pas y puiser. »

### P2. Section 7, « Sans eau chaude ni savon » (`[À VÉRIFIER]`) : le ruban adhésif sort

- **Texte :** « Du ruban adhésif appliqué puis arraché lève la poussière des cheveux, des sourcils et du dos des mains
  [À VÉRIFIER]. »
- **Source :** aucune page officielle ne le dit (CDC, Ready.gov, REMM, ORNL, gouvernement du Royaume-Uni consultés) ;
  une procédure universitaire trouvée au moteur de recherche le fait sur la peau et prévient que l'arrachement irrite.
  REMM (`04-remm-hhs-decontamination-externe.html`) dit, sans eau : « gently brush skin surface », ce que le texte
  fait déjà ; et pour les cheveux : « Contaminated hair can be clipped if shampooing is ineffective. Do not shave
  hair; avoid creating nicks, abrasions, breaks in skin. »
- **Correction proposée :** couper la phrase. Si JP veut garder un geste pour les cheveux : « On peut couper aux
  ciseaux les cheveux qui gardent de la poussière après le brossage, sans les raser : une coupure de rasoir laisse
  entrer la poussière. »

### P3. Section 7, « Sans eau fermée » : les « moins de 2 % » valent après une détonation, pas pour une centrale

- **Texte :** « Dans l'eau qui a reçu des retombées, presque tout le danger est dans la poussière qui flotte : moins de
  2 % de sa radioactivité se dissout. Enlever la poussière enlève donc presque tout. » ; « environ 99 % de la
  radioactivité de l'eau ».
- **Source :** ORNL, chap. 8, p. 72 et 73 : « in areas of heavy fallout, less than 2% of the radioactivity of the fallout particles
  contained in the water would become dissolved » (retombées d'une explosion). AIEA 2006, p. 34 du PDF
  (`04-aiea-2006-tchornobyl-environnement-p33-34-texte.txt`) : « at longer distances the fraction of soluble condensed
  particles increased. As one example, almost all the 137Cs deposited in 1986 in the United Kingdom was water soluble
  and exchangeable. » AIEA, TRS-472, tableau 12 : la terre retient le césium (Kd moyen 1 200 L/kg) environ 170 fois
  plus que l'iode (6,9 L/kg). ORNL, même page : la terre enlève « more of the dissolved radioactive material than does
  boiling-water distillation ». L'étape 12 dit que le panache d'une centrale apporte de l'iode : la section 7 doit
  valoir pour lui aussi.
- **Correction proposée** (premier paragraphe de « Sans eau fermée ») : « Après une détonation, presque tout le danger
  de l'eau est dans la poussière qui flotte : moins de 2 % de sa radioactivité se dissout, et enlever la poussière
  enlève presque tout. Le panache d'une centrale lointaine dépose au contraire un césium qui se dissout presque tout.
  La terre de la décantation et du filtre retient fortement le césium dissous, mais mal l'iode radioactif : pendant
  les six à huit semaines de l'iode, boire d'abord l'eau fermée (section 7, « Sans comprimés d'iode »). » Et, plus
  bas : « …environ 99 % de la radioactivité de l'eau, après une détonation. »

### P4. Section 7, le filtre de terre : sauf sur le sable et le gravier

- **Texte :** « Prendre de la terre qui contient un peu d'argile, à au moins 10 cm sous la surface : presque toute la
  poussière radioactive reste en surface. »
- **Source :** ORNL, chap. 8, p. 73 : « (Nearly all fallout particles remain near the surface except after deposition on sand or
  gravel.) » Le chapitre dit lui-même que sous la forêt boréale la terre est le plus souvent sableuse.
- **Correction proposée :** « …: presque toute la poussière radioactive reste en surface, sauf là où elle est tombée
  sur du sable ou du gravier. Ne pas prendre la terre sous une couche de sable ou de gravier. »

### P5. Étape 4 : les retombées ne se voient pas toujours

- **Texte :** « Si les retombées se mettent à tomber, entrer tout de suite dans le bâtiment le plus proche. Elles se
  voient : du sable fin, une poussière comme du sel de table, de la cendre, ou une pluie. »
- **Source :** FEMA 2022, p. 28 : « After a detonation near the surface, immediately dangerous fallout […] can be
  readily visible » ; ORNL, chap. 5, p. 49 : « air bursts produce only tiny particles » ; Québec, « Se mettre à
  l'abri » (`06-quebec-ccsn-mise-a-l-abri.md`) : « certain contaminants are invisible and odourless ». Le lecteur qui
  ne voit rien tomber après une alerte de centrale peut se croire épargné.
- **Correction proposée :** « …entrer tout de suite dans le bâtiment le plus proche. Après une explosion au sol, elles
  se voient : du sable fin, une poussière comme du sel de table, de la cendre, ou une pluie. Les retombées d'une
  explosion en altitude et le panache d'une centrale ne se voient pas : entrer dès l'alerte, sans attendre de voir
  quelque chose tomber. »

### P6. Étape 7 : le poêle fait entrer l'air du dehors, mais lentement

- **Texte :** « on peut garder allumé le poêle à bois qui chauffe la maison : il prend son air dans la maison et le
  renvoie dehors par son tuyau (étape 18). »
- **Source :** RNCan, p. 38 et 40 (`16c-rncan-refoulement-braise-effet-de-tirage.md`) : le tirage met la maison en
  pression négative ; l'air qui sort par le tuyau entre par les fentes. ORNL, annexe B, p. 194 : « The visible fallout
  particles rapidly "fall out" of slow moving air […] could carry into the shelter only a very small fraction of the
  fallout particles ». La conclusion du texte tient ; le mécanisme dit l'inverse de ce qui se passe.
- **Correction proposée :** « L'hiver, on peut garder allumé le poêle à bois qui chauffe la maison. Il envoie l'air de
  la maison dehors par son tuyau, et le même volume d'air entre par les fentes ; cet air entre lentement et n'apporte
  presque pas de poussière (étape 18). »

### P7. Étape 18, Matériel, Points de contrôle : l'avertisseur de CO ne lit pas bien au caveau

- **Texte :** l'avertisseur posé dans la pièce d'abri, « le seul moyen de savoir » ; contrôle avant chaque sommeil.
  Au chalet, la pièce d'abri est le caveau (étape 8).
- **Source :** page `co` (`dangers/partie-1.md`) : « L'avertisseur est conçu pour fonctionner dans une pièce entre 4,4
  et 37,8 °C » ; ch. 79 : le caveau se tient à 0 °C. Au caveau, l'avertisseur ne garantit rien.
- **Correction proposée** (dernière phrase de la première puce de l'étape 18) : « Au caveau, sous 4,4 °C, on ne peut
  pas se fier à l'avertisseur : ne rien faire brûler dans le caveau. »

### P8. Étape 18 contre la page `co` : sortir ou rester (décision de JP)

- **Texte :** « arrêter ce qui brûle, ouvrir la pièce d'abri sur le reste de la maison et y emmener tout le monde, sans
  sortir dehors, puis aérer ». La page `co`, que le pictogramme de l'étape renvoie, dit au point 1 : « Sortir tout le
  monde à l'air libre tout de suite ».
- **Source :** aucune source ne traite le monoxyde pendant les retombées (fiche de rédaction, 15 octobre). LLNL, p. ii :
  « Shelter for at least the first hour unless threatened by fire, building collapse, medical necessity, or other
  immediate threats » ; Ready.gov 2025 : « unless threatened by an immediate hazard (e.g., fire, gas leak, building
  collapse, or serious injury) » ; CDC 2008 : la pièce d'abri s'aère au bout de quelques heures.
- **À trancher par JP :** le texte fait une exception propre au chapitre, et il le dit (« sans sortir dehors »). Il ne
  dit pas quand l'exception cède : une personne qui ne se réveille pas bien ou reste confuse une fois la pièce aérée a
  la vie en jeu (page `co`, point 4). Aucune source ne chiffre le compromis entre les deux dangers.

### P9. Section 6 : deux doses d'iode chez un enfant de 4 ans et plus ne le mettent pas en danger

- **Texte :** « | Un enfant a reçu deux doses d'iode en moins de 24 heures | Trop d'iode | Ne pas le faire vomir. Sauter
  la dose suivante, et écrire l'heure et la quantité sur le cadre de porte | »
- **Source :** FDA 2002, Q2 et Q4 (`04-fda-2002-ki-questions-reponses.pdf`) : « Higher doses (e.g., up to 130 mg)
  would be equally effective and, particularly among school-age children, extremely safe » ; « where feasible,
  adherence to FDA guidance should be attempted when dosing infants. » « Sauter la dose suivante » : NON RETROUVÉ, et
  l'enfant reste sans protection le lendemain.
- **Correction proposée :** « | Un enfant a reçu deux doses d'iode en moins de 24 heures | Une dose de trop | Ne pas le
  faire vomir. À partir de 4 ans, deux doses font 130 mg, la dose d'un adulte, sans danger pour l'enfant. Écrire
  l'heure et la quantité sur le cadre de porte. Chez un bébé de moins d'un mois, trop d'iode peut ralentir la thyroïde
  pour un temps (étape 16) | » La dose suivante à l'heure prévue est une lecture de « dosed daily » (FDA) : à garder
  ou non par JP.

### P10. Étape 15 : la solution se fait aussi avec un comprimé de 130 mg

- **Texte :** « Mettre deux comprimés de 65 mg dans un petit bol » ; le tableau de l'étape 13 renvoie à cette solution
  dans la colonne des comprimés de 130 mg.
- **Source :** FDA 2012, version à un comprimé (`04-fda-2012-solution-ki-un-comprime-130-mg.pdf`) : même recette avec
  un comprimé de 130 mg, même dose par cuillère.
- **Correction proposée :** « Mettre deux comprimés de 65 mg, ou un comprimé de 130 mg, dans un petit bol, ajouter
  20 mL d'eau (4 cuillères à thé) et les laisser tremper 1 minute. »

### P11. Étape 12 : l'eau désinfectée à l'iode se boit

- **Texte :** « La teinture d'iode, la povidone iodée (Bétadine) et les comprimés d'iode pour désinfecter l'eau sont
  des poisons quand on les avale ». Le ch. 10, étape 23, désinfecte l'eau avec ces mêmes produits.
- **Source :** ORNL, p. 115 : « Elemental (free) iodine is poisonous, except in the very small amounts in water
  disinfected with iodine tablets or a few drops of tincture of iodine. »
- **Correction proposée :** « …sont des poisons quand on les avale (on peut boire l'eau qu'ils ont désinfectée : ch. 10,
  étape 23), et ils ne protègent pas la thyroïde ».

### P12. Étape 25 : faire tourner la fournaise sans filtre

- **Texte :** « Les filtres qui ont tourné pendant le passage ont retenu de la poussière radioactive […]. Sans filtre de
  rechange, faire tourner la fournaise sans filtre plutôt qu'avec l'ancien. »
- **Source :** Québec, « Se mettre à l'abri » (`06-quebec-ccsn-mise-a-l-abri.md`) : après l'avis, « nettoyer au besoin
  les systèmes de ventilation et remplacer les filtres » : CONFORME pour le remplacement. La fournaise sans filtre :
  NON RETROUVÉ. « Qui ont tourné pendant le passage » contredit l'étape 7, qui l'arrête.
- **Correction proposée :** « Les filtres ont pu retenir de la poussière radioactive : les mettre dans un sac fermé et
  les porter loin du bâtiment. » La phrase « Sans filtre de rechange… » sort, ou prend `[À VÉRIFIER]`.

### P13. Étape 30 : le bouillon d'os porte le césium, pas le strontium

- **Texte :** « le strontium s'accumule dans les os, comme le calcium. Dans un territoire qui a reçu des retombées :
  pas de bouillon d'os long, pas d'os broyé dans la viande hachée (ch. 72). »
- **Source :** AIEA, TRS-472, tableau 76 (`04-aiea-trs472-2010-transfert-terre-eau-douce.pdf`) : « Boiling bone » :
  part retenue dans l'os, Sr 0,99, Cs 0,3. L'os garde son strontium à la cuisson ; le bouillon prend le césium. L'os
  broyé et mangé apporte le strontium (MOE 2021, `04-japon-moe-2021-iode-cesium-strontium.md`) : CONFORME.
- **Correction proposée :** « …le strontium s'accumule dans les os, comme le calcium, et il y reste à la cuisson : pas
  d'os broyé dans la viande hachée. Le bouillon d'os prend le césium des os et de la viande : le jeter, comme à
  l'étape 32. » Le renvoi au ch. 72 vise sa graisse d'os et le bouillon qui reste dessous (section B) : à garder sur la
  phrase du bouillon.

### P14. Section 7, « Sans sous-sol ni caveau » : la neige fond dans une pièce chauffée, et il en faut beaucoup

- **Texte :** « L'hiver, le sol est gelé : prendre de la neige, tassée et arrosée comme pour le banc (repère 3). » (les
  sacs du refuge, montés à l'intérieur).
- **Source :** ORNL, p. 158 : « With wetted or well-packed snow 5 ft thick, the protection factor is about 50. » Dans
  une maison chauffée, la neige des sacs fond (aucune source requise : 0 °C). Le banc de neige du dehors est conforme
  (neige arrosée).
- **Correction proposée :** « L'hiver, le sol est gelé : monter la neige dehors, contre les murs, tassée et arrosée
  comme pour le banc (repère 3). Dans une pièce chauffée, la neige fond. La neige arrête beaucoup moins que la terre :
  il en faut environ 1,5 m, arrosée ou bien tassée, pour diviser la dose par 50. »

### P15. Étape 31 : le rappel du botulisme de type E manque pour le poisson

- **Texte :** le poisson trempe 4 à 8 heures, bain « entre 0 et 4 °C ».
- **Source :** `CLAUDE.md`, tableau des rappels : « Botulisme de type E : produit sa toxine dès 3 °C […] | Tout le
  poisson, surtout fumé » ; page `botulisme` : « On l'arrête seulement sous 3 °C ». La fiche de rédaction l'a sorti
  (« aucune étape ne fume ni ne garde de poisson »), mais le trempage est une étape qui garde du poisson dans l'eau, et
  la règle du tableau vise tout le poisson. Sur 4 à 8 heures, le risque est faible ; aucune source au dossier ne le
  chiffre.
- **Correction proposée :** poser `{!botulisme}` sur la puce du poisson, et écrire : « Tenir le bain du poisson sous
  3 °C, avec de la glace ou de la neige. »

### P16. Section 6 : « une à deux semaines plus tard »

- **Source :** ORNL, p. 110 : « If the dose received was in the non-fatal range, the latent phase may last as long as
  2 weeks. » La source donne un plafond, pas un plancher.
- **Correction proposée :** « | Dans les deux semaines qui suivent, les cheveux tombent en touffes, … | »

### P17. Section 7, « Sans sel » : « 4 heures de trempage » perdues

- **Source :** Petäjä (`06-acta-vet-brno-2016-cesium-trempage.md`) : « successively for 4 h in 5% brine and water » ;
  le temps dans l'eau qui suit la saumure n'est pas donné. Rien ne dit que la saumure fait gagner 4 heures.
- **Correction proposée :** « **Ce qu'on perd :** du temps de trempage pour le poisson, et une eau courante froide qu'il
  faut trouver. »

### P18. Section 7, le poste à galène : le détecteur et l'écouteur ne sont pas dans la source

- **Source :** NBS, circulaire 120 (`06-nbs-circulaire-120-poste-a-galene.md`) : bobine (80 tours, prises, tube de
  10 cm), antenne longue et isolée aux deux bouts, terre au tuyau d'eau : CONFORME. La lame de rasoir bleuie et la mine
  de crayon (le détecteur), la pastille piézo, « avec un haut-parleur ordinaire, on n'entend rien » : NON RETROUVÉ. La
  circulaire prend un cristal de galène et un écouteur de téléphone (« telephone receiver »). Sans enjeu de sécurité ;
  à sourcer ou à garder comme geste.

### P19. Renvois faibles

- Section 6, « Garder les antibiotiques pour cette période […] (ch. 32, ch. 35) » : la phrase vient de l'ORNL (« Any
  available antibiotics should be reserved for this critical phase ») ; le ch. 32 refuse de stocker des antibiotiques
  sans ordonnance active (section 5-B, tableau des catégories, ligne « Ce que le chapitre refuse de mettre au stock »). Les deux
  chapitres se contredisent ; rien changé au ch. 32.
- Section 6, « une brûlure de la rétine, qui reste (ch. 35) » : le ch. 35 ne parle ni de la rétine ni de
  l'irradiation. Renvoi faible.
- Étape 28, « (ch. 93) » : le ch. 93 ne parle pas du césium ; renvoi au chapitre des champignons, acceptable.

---

## 3. Les quatre `[À VÉRIFIER]` du rédacteur

| Où | Verdict | Texte proposé |
| --- | --- | --- |
| Étape 26, la pluie | **Confirmé, à préciser** (P1) : Japon MOE 2013, ORNL p. 72 | P1 |
| Section 7, la pompe à carton | **Erreur** (E3) : un battant sans volets est le punkah de Kearny | E3 : la pompe à volets, planche à refaire |
| Section 7, le ruban adhésif | **Coupe** (P2) : aucune page officielle | P2 |
| Section 7, le poisson du fleuve | **Confirmé** : AIEA, poisson de mer 100 L/kg (TRS-422, tableau III) contre 2 500 L/kg en moyenne pour le muscle du poisson d'eau douce (TRS-472, tableau 57), d'autant plus que l'eau est pauvre en potassium ; Japon MOE 2018 : plus aucun poisson de mer au-dessus de la limite depuis 2015, encore des poissons d'eau douce | Enlever `[À VÉRIFIER]` ; la phrase tient telle quelle. Au début, après Fukushima, le poisson de mer était le plus chargé, à cause de l'eau rejetée directement dans la mer : sans rejet dans le fleuve, ce cas ne s'applique pas |

---

## 4. Les deux contradictions signalées

### Ch. 8, « À la sortie : Déboucher les ouvertures et les prises d'air » contre ch. 4, étape 18

**Le ch. 4 a raison.** CDC 2008 (`04-cdc-abri-ventiler-en-quelques-heures.md`) : « seal any doors, windows, or vents
for a short period of time in case a radiation plume is passing over […] Within a few hours, you should remove the
plastic and duct tape and ventilate the room. Suffocation could occur if you keep the shelter tightly sealed for more
than a few hours. » ORNL, chap. 6 : « ventilation should not be restricted long enough to cause weaker occupants to be
on the verge of collapse from overheating, or to result in headaches from exhaled carbon dioxide » ; FEMA 2022 :
« Make sure to maintain enough ventilation to ensure adequate indoor air quality. » La page de Québec « Se mettre à
l'abri » (`06-quebec-ccsn-mise-a-l-abri.md`) fait retirer les obstacles « après la levée de l'avis », mais c'est une
page générale, faite pour un abri de quelques heures ; pour 24 à 48 heures de retombées, le bouchage dure quelques
heures. Correction pour le ch. 8, à faire par son rédacteur : « | Après quelques heures | Déboucher les ouvertures de
la pièce d'abri et l'aérer | ch. 4, étape 18 | » ; « À la sortie » garde les filtres de la fournaise (Québec, CONFORME).

### Ch. 10, étape 1, « faire bouillir ou filtrer l'eau n'enlève pas ce qui est radioactif » contre ch. 4, section 7

**Le ch. 4 a raison pour les retombées d'une détonation ; le ch. 10 a raison pour l'ébullition seulement.** ORNL,
p. 71 : « neither fallout particles nor dissolved radioactive elements or compounds can be removed from water by
chemical disinfection or boiling » ; p. 72 et 73 : « Filtering through earth removes essentially all of the fallout particles
and more of the dissolved radioactive material than does boiling-water distillation […]. In areas of heavy fallout,
about 99% of the radioactivity in water could be removed by filtering it through ordinary earth » ; décanter à
l'argile « will carry most of the suspended fallout particles to the bottom ». Réserve (P3) : après une centrale
lointaine, le césium est presque tout dissous (AIEA 2006) ; la terre le retient quand même fortement, l'iode beaucoup
moins (AIEA, TRS-472, tableau 12). Correction pour le ch. 10, à faire par son rédacteur : « Après des retombées
radioactives, faire bouillir ou chlorer l'eau n'enlève rien de ce qui est radioactif ; la décanter à l'argile et la
passer au filtre de terre en enlèvent presque tout (ch. 4, section 7). »

---

## 5. Pictogrammes et rappels de sécurité

**Les huit identifiants existent** dans `plan/dangers-inventaire.md`, section 1, et dans `images/pictos-dangers/` :
`poison` (étapes 12, 16), `co` (18), `generatrice` (19), `abats` et `mal-de-caribou` (30), `zone-de-danger` (31),
`cuisson` et `trichine` (32). Le ch. 4 est inscrit dans la colonne « Chapitres » de chacun ; la section 3 de
l'inventaire note les poses du 18 octobre. Chacun est posé dans l'étape où le danger se présente.

**Concordance avec les pages des dangers :** `generatrice`, 6 m : CONFORME. `cuisson`, 74 °C et 70 °C tenu 1 minute :
CONFORME. `zone-de-danger`, 4 à 60 °C, bain tenu entre 0 et 4 °C : CONFORME. `abats`, cadmium du foie et des reins de
cervidé : CONFORME. `mal-de-caribou`, garder le gras : CONFORME. `trichine`, ni sel, ni fumée, ni gel, et l'ours ou le
phoque trempé : CONFORME. Deux pages donnent un geste que l'abri interdit :
- `co`, point 1, « Sortir tout le monde à l'air libre » : l'étape 18 fait l'inverse, à dessein (P8).
- `poison`, point 2, « partir vers l'hôpital » : pendant les 24 heures d'abri, personne ne part (étape 24). L'étape 12
  porte le pictogramme pour les iodes qu'on ne doit pas avaler ; la ligne de la section 6 (deux doses) reprend « ne pas
  le faire vomir » de la page. Pas de correction de fond ; à garder en tête au montage des pages des dangers.

**Les rappels du tableau de `CLAUDE.md` :**

| Rappel | Au ch. 4 | Verdict |
| --- | --- | --- |
| 74 °C à cœur, gibier | Étape 32, `{!cuisson}` | Présent |
| Jamais le foie ni les reins de cervidés | Étape 30, `{!abats}` | Présent |
| Trichinellose : ni sel, ni fumage, ni gel | Étape 32, `{!trichine}` (le trempage ne la tue pas ; la page dit le reste) | Présent |
| Tularémie | Le chapitre ne traite pas le lièvre | Sans objet |
| Thuyone | Le chapitre ne fait pas de tisane | Sans objet |
| Botulisme de type E dès 3 °C | Le poisson trempe 4 à 8 h, bain entre 0 et 4 °C | **Manque** (P15) |
| Le botulisme ne change ni l'odeur, ni le goût | Conserves mangées, pas faites (étape 21) | Sans objet |
| Viande maigre seule, mal de caribou | Étape 30, `{!mal-de-caribou}` | Présent |
| Génératrice jamais sous un toit | Étape 19, `{!generatrice}` | Présent |

**Danger sans pictogramme, à juger :** au chalet, l'abri est le caveau à 0 °C (ch. 79), 24 à 48 heures, en hiver.
`froid` pourrait aller à l'étape 8 ; aucune source au dossier ne traite le froid d'un abri.

---

## 6. Confirmé

CONFORME : retrouvé dans la source notée. Les numéros de page sont ceux des fiches citées.

| # | Fait ou valeur | Où | Source |
| --- | --- | --- | --- |
| 1 | Souffle : 1,6 km en 5 s au-delà de quelques km, 3 s par km, de quelques secondes à plus de 30 s ; vitres cassées à des km ; aller voir à la fenêtre blesse | Étape 1 | FEMA 2022 p. 16 et 17 ; LLNL 2009 p. 3 |
| 2 | Dehors, à plat ventre, peau protégée de la chaleur et des débris ; à couvert derrière ce qui protège | Étape 2 | Ready.gov 2025. « Les mains sous le corps » : application, sans enjeu |
| 3 | Éblouissement même sans regarder ; quelques s le jour, 5 à 10 min la nuit ; tache sombre plusieurs minutes ; accidents | Étape 3 ; section 6 | FEMA 2022 p. 22 et 23 |
| 4 | Auto : dose divisée par moins de 2 | Étape 3 | LLNL tableau 1 (1,7 à 2) |
| 5 | Retombées en 10 min ou plus ; plus de la moitié du rayonnement dans la 1re heure | Étape 4 | FEMA 2022 p. 32 et 53 ; Ready.gov |
| 6 | Terre, béton, brique ; ordre des abris ; maison de bois ÷ 2 ou 3, mieux que dehors | Étape 4 | FEMA p. 65 et 66 ; LLNL |
| 7 | Sable fin, sel de table, cendre, pluie (explosion au sol, P5) ; linge sur le nez et la bouche | Étape 4 | FEMA p. 28 ; LLNL p. iv ; CDC |
| 8 | Vêtements du dessus et chaussures : jusqu'à 90 % ; sans secouer ; sac loin des gens et des animaux | Étape 5 | CDC 2024 ; Ready.gov |
| 9 | Ne pas aller chercher ; l'école garde les enfants ; animaux à portée | Étape 6 | CDC Get Inside ; Québec |
| 10 | Fermer ; arrêter ventilateurs, climatiseur, fournaise à air pulsé ; clé des foyers | Étape 7 | CDC ; Ready.gov. L'échangeur d'air : même fonction, application |
| 11 | Sous-sol ÷ 10 à 20, contre un mur enterré ; pas besoin d'étanchéité ; fenêtres cassées | Étape 8 | LLNL p. ii et tableau 1 ; FEMA p. 66 |
| 12 | Meilleur abri à moins de 15 min (le 30 min : E1) | Étape 9 | FEMA p. 67 |
| 13 | Lavage : savon, sans frotter, coupures couvertes, pas de revitalisant ; eau du robinet ; linge, serviette, lingette ; paupières, cils, oreilles ; pas de lingette ménagère ; désinfectant inutile ; vêtements d'un tiroir ; secouer les siens | Étape 10 | CDC 2024 et infographie ; Ready.gov |
| 14 | Brosser le poil des animaux, les laver, se laver après | Étape 10 | Ready.gov (« Gently brush your pet's coat ») ; CDC |
| 15 | La thyroïde ne fait pas la différence ; ne protège qu'elle, contre l'iode, environ 24 h ; pas un remède | Étape 12 | OMS 2025 ; CCSN ; CDC |
| 16 | Teinture, povidone, comprimés pour l'eau : poisons avalés, ne bloquent pas ; sur la peau, moins de protection, effets graves | Étape 12 | ORNL p. 115 à 117 (nuance P11) |
| 17 | Sel iodé trop faible, risque à en manger beaucoup ; suppléments | Étape 12 | OMS ; CDC (pour les suppléments : « may not work […] and can hurt you », le texte dit « beaucoup trop peu » : écart sans conséquence) |
| 18 | Tableau des doses (16, 32, 65, 130 mg ; ¼, ½, 1, 2 comprimés de 65 mg ; ½ et 1 de 130 mg ; solution sous 3 ans) | Étape 13 | CDC ; FDA FAQ (même tableau) |
| 19 | 70 kg, dose adulte à l'adolescent | Étape 13 | FDA (« > 150 lbs or 70 kg ») |
| 20 | Après 40 ans : cancer rare, effets plus fréquents, seulement contre une dose qui détruirait la thyroïde ; enfants d'abord | Étape 13 | FDA 2002 ; OMS 2025 |
| 21 | 24 h avant à 2 h après ; encore utile à 8 h ; inutile après 24 h ; chaque jour ; ne pas doubler | Étape 14 | OMS 2025 ; FDA FAQ |
| 22 | Solution : 2 × 65 mg, 20 mL d'eau, 1 min, écrasés, 20 mL de boisson ; 5, 10, 20 mL ; froid, 7 jours ; mauvais goût | Étape 15 | FDA 2012 ; ORNL p. 117 |
| 23 | Une seule dose : nouveau-né, femme enceinte ou qui allaite, plus de 60 ans | Étape 16 | CCSN ; FDA (« Unless other protective measures are not available, we do not recommend repeat dosing ») |
| 24 | Nouveau-né : thyroïde ralentie un temps ; contre-indications ; surtout des adultes ; Pologne, 7 millions, deux réactions | Étape 16 | FDA 2002 ; FDA FAQ. « Crise de la thyroïde » : MSD (l'excès d'iode peut provoquer une hyperthyroïdie sur nodule), CONFORME en partie |
| 25 | Note [^1] : signes de la réaction allergique et de la crise | Étape 16 | FDA FAQ ; MSD |
| 26 | Radio à piles ou à manivelle | Étape 17 | Ready.gov |
| 27 | Bouchage quelques heures, puis aérer, sinon suffocation ; il arrête la poussière, pas le rayonnement | Étape 18 | CDC 2008 ; FEMA p. 66 |
| 28 | Signes du CO pris pour ceux de l'irradiation | Étape 18 | Page `co` ; ORNL p. 110 (nausée, mal de tête) |
| 29 | Génératrice dehors à 6 m ; garage, entrée, auvent | Étape 19 | Page `generatrice` |
| 30 | Ce qui était dedans ou fermé ; contenant essuyé ; rien de ce qui était dehors à découvert | Étape 21 | Ready.gov |
| 31 | Aqueduc : boire la réserve ; puits tubé fermé protégé ; lac, ruisseau, baril (neige : E7) | Étape 22 | CDC (eau du robinet : bouteille pour boire) ; ORNL p. 71 et 72 |
| 32 | Lait frais ; environ 5 000 cancers ; lait en poudre ou en conserve | Étape 23 | CCSN (« probablement attribuables » : le texte l'affirme sans le « probablement ») ; Ready.gov. La chèvre : AIEA TRS-472, tableaux 26 et 27 (iode au lait : chèvre 2,2 × 10⁻¹, vache 5,4 × 10⁻³ d/L) |
| 33 | 24 h ; feu, fuite de gaz, effondrement, blessure grave ; 80 % le premier jour | Étape 24 | Ready.gov ; LLNL p. 3. Les 48 h : lecture (FEMA « at least 12‒24 hours ») |
| 34 | Remplacer les filtres après l'abri | Étape 25 | Québec (P12) |
| 35 | Légumes-feuilles jetés ; laver ; peler | Étape 27 | ORNL p. 116 et chap. 2. « Les légumes-racines, moins exposés » : NON RETROUVÉ tel quel, cohérent avec « peeling removes essentially all fallout » |
| 36 | Césium : 30 ans ; champignons plus que les plantes, année après année | Étape 28 | CCSN ; DSA Norvège |
| 37 | Lichen : prend la poussière ; bêtes nourries dedans en dernier ; orignal ; lacs pauvres ; bête malade | Étape 29 | DSA ; NRPA ; MRNF Potvin ; ORNL p. 76 |
| 38 | Césium dans toute la viande, strontium dans les os ; foie, reins, thyroïde d'une bête exposée | Étape 30 | MOE 2021 ; ORNL p. 76 |
| 39 | Trempage : 200 g, 2 jours, moins de la moitié ; 20 % ; 10 % ; poisson 70 à 290 g, 4 h à 50 g/L puis eau, ou 8 h à l'eau courante, moitié ; sel ordinaire | Étape 31 | Petäjä ; Acta Vet Brno 2016. Bain entre 0 et 4 °C : lecture (ch. 69, page `zone-de-danger`) ; AIEA TRS-472, tableau 76 (saumure : césium retenu 0,5) concorde |
| 40 | Bouillon jeté : la moitié du césium ; l'eau plus que le gril ; 74 °C, 70 °C tenu 1 min ; trichine | Étape 32 | MOE Japon ; AIEA TRS-472 tableau 76 (viande bouillie : 0,4 retenu) ; page `cuisson` ; page `trichine` |
| 41 | Comprimés entre 15 et 30 °C, à l'abri de la lumière et de l'humidité | Étape 33 | Québec |
| 42 | Rétine ; brûlure de la chaleur ; brûlures bêta (des dizaines de minutes, démangeaison, couleur, semaines) ; premiers signes, demi-heure, peur ; un à deux mois ; antibiotiques ; repos, repas, propreté ; soigner sans danger | Section 6 | FEMA p. 22 et 23 ; ORNL p. 43, 110, chap. 2 |
| 43 | Iode : 8 jours, moins de 3 % à six semaines ; rester dedans réduit l'iode respiré | Section 7 | CCSN ; calcul 0,5^(42/8) = 2,6 % ; ORNL citant la FDA |
| 44 | 9 cm de terre, 6 cm de béton, ÷ 32 et ÷ 64 ; plus dense, mieux ; neige arrosée (P14) | Section 7 | ORNL p. 13 et 14, p. 158 |
| 45 | Électroscope : fil de métal, bouchon isolant, humidité ; gypse en morceaux de 1 cm (½ po = 1,3 cm), 1 h au-dessus de 200 °C ou 20 min au rouge sombre, encore chaud, deux jours, ni sel ni chlorure de calcium ; 3 h sans bouger (règle du KFM, transposée) ; la table ne vaut que pour le KFM | Section 7 | NISE 2019 ; ORNL annexe C |
| 46 | Pièce chaude et humide en quelques heures ; éventail 55 × 35 cm, ouverture 60 × 50 cm, coudes plus bas, 40 coups par minute, sens de l'air, près de 8 m³/min, 9 adultes l'été, une centaine par temps froid ; décantation (2,5 cm pour 10 cm, 6 h) ; filtre de terre (trous, cailloux, linge 8 cm plus large, 15 à 18 cm, ni argile pure ni sable, deux bâtons, 6 puis 2 L/h, un litre en 10 min, 2,5 cm, une cinquantaine de litres, désinfecter) ; terre sableuse sous la forêt boréale ; ruban entre les doigts ; eau claire au lieu de la saumure ; les quatre encadrés En plus (baisse du rayonnement, estomac du caribou, rennes, argile de la mer) ; costume : le rayonnement traverse le sac | Section 7 ; En plus | ORNL chap. 1, 6, 8 ; AAC ; CSU ; Petäjä ; Kuhnlein et Turner ; Turner 1894 ; NRPA 2006 ; Skuterud ; MRN 1975 ; FEMA p. 66 (« Wood, drywall, and thin sheet metal provide minimal shielding ») |

Le reste du Matériel (65 mg, radio, eau 4 L par personne et par jour, base du livre aux ch. 1, 5 et 6 ; avertisseur
de CO) et des Points de contrôle (hors E1 et E2 ; « 0 ppm affiché » : Kidde, tout chiffre affiché est du CO,
`15-kidde-reentree-et-affichage-co.md`) : CONFORME. Pastilles : 30 s (LLNL « up to 30 seconds or more »), 10 min
(FEMA, Ready.gov), 2 h (OMS, à compter de l'arrivée des retombées : voir E2) : CONFORME.

**Noms d'espèces :** caribou, renne, orignal, lichen, champignons, poisson, ours, phoque, vache, chèvre : noms de tous
les jours, aucun nom latin dans le texte. CONFORME.

---

## 7. Logigramme et planches

- **Logigramme :** nœud « changer » (E1) ; nœud « Écrire l'heure… » (E2). Le reste dit ce que disent les étapes, et
  chaque `renvoi` tombe sur l'étape qui dit la chose.
- **04-01b :** à refaire (E3), avec son ancre.
- **04-01a :** si la neige des sacs passe dehors (P14), le repère 3 (« neige tassée et arrosée ») ne se montre que dans
  le banc du dehors.
- **04-41, 04-42, 04-40 :** rien de technique à redire par rapport au texte ; P4 (sable et gravier) ne change pas le
  dessin.

---

## Liste de contrôle du cadre (`.claude/cadre-agents.md`), pour ma partie

Pour tout agent
- [x] `CLAUDE.md` lu au complet.
- [x] Le cadre lu au complet ; le rôle 3 de `roles.md` ; la fiche modèle `suivi/12-technique.md`.
- [x] Le skill de ma partie : il n'y a pas de skill du vérificateur ; le skill `ecriture` est lu pour que les textes
  proposés mot pour mot suivent ses règles (infinitif, aucun tiret, aucun pronominal de consigne, mots de tous les
  jours).
- [x] `suivi/plan-de-match.md`, section « PAUSE du 15 octobre », lue (points 1 à 12 parcourus ; rien de technique de
  plus pour le ch. 4 que l'électroscope et l'iode après 40 ans, déjà réglés par la refonte et confirmés ici).
- [x] Règle 1 : chaque correction proposée porte sa source, enregistrée dans `sources/` ; ce qui ne se trouve pas est
  marqué NON RETROUVÉ ou `[À VÉRIFIER]`.
- [ ] « Ne rien commiter » : le brief de l'orchestrateur demande cette fois le commit et le push de la fiche et des
  sources ; seuls ces fichiers sont ajoutés.

Le texte : la forme, l'urgence, la phrase, la procédure, la répétition, les planches dans le texte
- [x] Sept sections et section « En plus » : présentes, dans l'ordre ; aucun « § ».
- [x] Pictogrammes : les huit existent (inventaire, section 1 ; `images/pictos-dangers/`), posés dans l'étape où le
  danger se présente ; concordance avec les pages vérifiée (section 5).
- [x] Série orange : chaque consigne de sécurité confrontée aux autres dangers du scénario (P8, `co` ; `poison`).
- [x] Pastilles : 30 s, 10 min, 2 h sourcées (section 6) ; le point de départ du délai de l'iode corrigé (E2).
- [x] Les planches appelées : 04-01b à refaire (E3), son ancre à changer ; les autres appels inchangés.
- [ ] La phrase, la répétition, `controle.py` : rôle de l'éditeur, pas du vérificateur ; je ne réécris pas le
  chapitre. Les textes proposés ici sont à repasser au script quand le rédacteur les appliquera.

Le montage
- [x] Aucun vérificateur sécurité lancé ni consulté.
- [ ] Le reste (pages, double page, débordements) : rôle du metteur en pages et de l'orchestrateur.
