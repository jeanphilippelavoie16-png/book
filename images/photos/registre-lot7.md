# Lot 7 (chapitres 67 à 78) : registre des photos téléchargées

- **Date du téléchargement :** 23 septembre 2026
- **Dossier :** `images/photos/lot7/`
- **Registre de candidates :** `images/candidats-lot7.md`
- **Statut :** fichiers de travail. Rien d'ici n'entre dans `images/credits.md` avant la signature du relecteur que nomme le registre de candidates : relecteur poisson pour 70-05, jardinier semencier pour 75-02 et 75-03, vérificateur sécurité pour la légende de 74-05 + 76-04.

## Ce que ce registre affirme, et ce qu'il n'affirme pas

**Aucune identification n'est validée ici**, ni d'espèce, ni de stade, ni d'état. La ligne « ce que la source affirme » recopie la description de la page de fichier. Les mots « fresh », « overripe », « ripe pods for seed » et « high content of solanine » sont ceux des auteurs.

**La licence a été revérifiée à la source** le jour du téléchargement, par l'API de Wikimedia Commons (`extmetadata.LicenseShortName`, `Artist`, `Credit`, `ImageDescription`). Les 23 candidates interrogées existaient toutes et portaient toutes la licence que le registre de candidates leur donnait : **aucune n'a été écartée pour la licence.** Aucune licence non commerciale.

**Ce lot est fait de références autant que de photos à imprimer.** Le registre de candidates classe les six planches « à commander à un illustrateur ». La colonne « usage » du tableau reprend ce qu'il prévoit pour chaque fichier. Sa réserve tient toujours : une planche composite de photos CC BY-SA, ou un dessin décalqué sur une photo CC BY-SA, est une œuvre dérivée qui hérite de la licence. La question va au responsable des droits avant la mise en pages.

## Comment les fichiers ont été pris

- **Vignettes quand l'original est refusé.** Demandée à 2400 px, l'API renvoie la vignette standard de 3840 px quand l'original est plus large, et sinon l'original lui-même. Le serveur de fichiers refuse la plupart des originaux à un script (HTTP 429, même après trois essais espacés de 6 s, puis quatre de 15 s) et refuse toute largeur non standard (HTTP 400). Quand l'original a été refusé, on a pris la plus grande vignette standard sous la largeur de l'original (1920 ou 960 px), jamais un agrandissement. La fiche dit lequel des deux a été téléchargé et donne la taille de l'original, à redemander à la main si une planche en a besoin.
- **Seuil « trop petite » :** une candidate dont le fichier accessible fait moins de 1000 px sur son côté le plus long est écartée au profit de la suivante, sauf si le registre de candidates la recommande nommément comme référence de dessin (`75-03c`).
- Un fichier à la fois, au moins une seconde de pause entre deux requêtes, agent `GrandLivreDuChalet/1.0 (livre personnel)`, aucune adresse courriel envoyée. En-tête de chaque fichier vérifié : 16 JPEG, aucune page HTML.

## Ce qu'il y a dans le dossier

16 fichiers, 15,54 Mo (15 536 301 octets).

| Fichier | Image visée | Auteur | Licence vérifiée | Dimensions (px) | Usage prévu par le registre de candidates |
| --- | --- | --- | --- | --- | --- |
| `70-05a-branchies-brochet.jpg` | 70-05a | User:Uwe Gille | CC BY-SA 3.0 | 2080 × 1847 | référence |
| `70-05b-oeil-saumon.jpg` | 70-05b | cogdogblog | CC BY 2.0 | 3840 × 2880 | référence |
| `70-05c-tetes-poisson.jpg` | 70-05c | Fumikas Sagisavas | CC0 | 3000 × 3000 | référence |
| `70-05d-branchies-planche-1910.jpg` | 70-05d | United States Fish Commission | Public domain | 1920 × 1152 | référence (structure) |
| `74-05a-patate-saine.jpg` | 74-05a | Scott Bauer, USDA ARS | Public domain | 2864 × 1861 | montage photo ou référence |
| `74-05b-patate-verdissement-leger.jpg` | 74-05b | SciThreads | CC BY-SA 4.0 | 1080 × 801 | montage photo ou référence |
| `74-05c-patate-verdissement-avance.jpg` | 74-05c | Rasbak | CC BY-SA 3.0 | 1920 × 1440 | montage photo ou référence |
| `74-05d-patate-germes.jpg` | 74-05d | ZooFari | Public domain | 1920 × 1440 | montage photo ou référence |
| `75-02a-haricot-gousses-semence.jpg` | 75-02a | Schlaghecken Josef | CC BY-SA 4.0 | 3840 × 2880 | référence (planche dessinée) |
| `75-02c-concombre-trop-mur.jpg` | 75-02c | Fumikas Sagisavas | CC0 | 3840 × 2880 | référence (planche dessinée) |
| `75-02d-laitue-fleur-aigrette.jpg` | 75-02d | Forest and Kim Starr | CC BY 3.0 us | 2736 × 3648 | référence (planche dessinée) |
| `75-03a-courge-fleur-femelle.jpg` | 75-03a | Forest & Kim Starr | CC BY 3.0 | 1920 × 1440 | photo telle quelle |
| `75-03b-courge-fleur-male.jpg` | 75-03b | Forest & Kim Starr | CC BY 3.0 | 1920 × 1440 | photo telle quelle |
| `75-03c-courge-femelle-ovaire-stylo.jpg` | 75-03c | RoRo | CC0 | 960 × 604 | référence (dessin) |
| `75-03d-courge-male-femelle.jpg` | 75-03d | Mad.madrasi | CC BY-SA 3.0 | 1920 × 1440 | photo ou référence |
| `75-03e-courge-pollinisation-main.jpg` | 75-03e | Zenon Sych | CC BY-SA 4.0 | 1920 × 2560 | référence, à montrer au relecteur |

**Sur 70-05.** Les quatre fichiers ne couvrent que le côté frais. Le registre de candidates n'a trouvé sous licence aucune branchie brunie, aucun œil laiteux, aucune paroi verdâtre, et il juge cette demi-planche inutile seule : la planche sort, ou l'illustrateur travaille sur des poissons réels. Les fichiers sont gardés comme références pour ce deuxième cas, pas comme une planche.

## Images visées sans fichier

| Image visée | Pourquoi rien n'a été téléchargé |
| --- | --- |
| 67-01 : les trois gras d'orignal à froid | Le registre de candidates ne retient aucune candidate : ce qui existe est du veau, du porc ou de l'impala. La planche sort, le texte porte les trois textures. |
| 75-02, colonne tomate blette | Aucune candidate utilisable selon le registre (la seule trouvée fait 512 × 240 et montre des tomates de compost). `Lyc-sim-2.JPG` n'y est donnée qu'en appoint pour les graines, pas pour le stade : pas prise. |
| 77-01 : les trois pots de choucroute, jour 0 / 7 / 28 | Le registre conclut qu'aucune photo ne porte la planche : aucune série datée, et le tri interdit le dessin. La planche sort. Les trois pots génériques listés n'ont pas été pris. |

## Écartées au téléchargement

| Candidate | Image visée | Raison |
| --- | --- | --- |
| `Cucurbita-flowers-male-female.jpg` · Abrahami · CC BY-SA 3.0 (licence confirmée) · https://commons.wikimedia.org/wiki/File:Cucurbita-flowers-male-female.jpg | 75-03d (candidate 1) | **Trop petite dans ce qui est accessible.** L'original (867 × 1200) est refusé par le serveur (HTTP 429, sept essais) et la plus grande vignette standard sous sa largeur fait 500 px. Remplacée par la candidate 2. À redemander à la main si on tient à cette photo-là. |

**Remarque sur 74-05d.** L'original de la candidate 1 (`Potato with sprouts.jpg`) a d'abord été refusé (HTTP 429), et le script est passé à la candidate 2 (`Russet potato cultivar with sprouts.jpg`). La candidate 1 a été reprise ensuite en vignette 1920 px, et le fichier de la candidate 2 a été retiré du dossier : elle n'est pas écartée, elle n'a pas servi.

---

## Fiches

### `70-05a-branchies-brochet.jpg`

- **Image visée :** 70-05 (+ 56-4), fraîcheur du poisson : côté frais, branchies
- **Fichier source :** `Gills (esox).jpg`
- **Ce que la source affirme :** « Gill arches of a Northern Pike (Esox lucius) »
- **Auteur :** User:Uwe Gille (« Own work »)
- **Licence vérifiée :** CC BY-SA 3.0 (Creative Commons Attribution-Share Alike 3.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Gills_(esox).jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/e/e6/Gills_%28esox%29.jpg (original)
- **Dimensions :** 2080 × 1847 px (original déposé : 2080 × 1847)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Référence pour l'illustrateur. Arcs branchiaux préparés pour l'anatomie ; la source ne dit pas si le poisson était frais.

### `70-05b-oeil-saumon.jpg`

- **Image visée :** 70-05 (+ 56-4), fraîcheur du poisson : côté frais, œil
- **Fichier source :** `2014-365-298 I See You (15450551677).jpg`
- **Ce que la source affirme :** « A Salmon's last stare »
- **Auteur :** cogdogblog — crédit déclaré : https://www.flickr.com/photos/cogdog/15450551677/
- **Licence vérifiée :** CC BY 2.0 (Creative Commons Attribution 2.0)
- **Page :** https://commons.wikimedia.org/wiki/File:2014-365-298_I_See_You_(15450551677).jpg
- **Téléchargé :** https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/2014-365-298_I_See_You_%2815450551677%29.jpg/3840px-2014-365-298_I_See_You_%2815450551677%29.jpg (vignette 3840 px renvoyée par l'API)
- **Dimensions :** 3840 × 2880 px (original déposé : 3968 × 2976)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Référence pour l'illustrateur. La source ne dit rien de la fraîcheur : que l'œil soit bombé et clair reste à juger à l'œil par le relecteur poisson.

### `70-05c-tetes-poisson.jpg`

- **Image visée :** 70-05 (+ 56-4), fraîcheur du poisson : côté frais, tête entière
- **Fichier source :** `Fresh fish heads.jpg`
- **Ce que la source affirme :** « Fresh fish heads »
- **Auteur :** Fumikas Sagisavas (« Own work »)
- **Licence vérifiée :** CC0 (Creative Commons Zero, Public Domain Dedication)
- **Page :** https://commons.wikimedia.org/wiki/File:Fresh_fish_heads.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/c/ca/Fresh_fish_heads.jpg (original)
- **Dimensions :** 3000 × 3000 px (original déposé : 3000 × 3000)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Référence pour l'illustrateur. Espèce non nommée par la source. « Fresh » est le mot de l'auteur, pas un constat.

### `70-05d-branchies-planche-1910.jpg`

- **Image visée :** 70-05 (+ 56-4), fraîcheur du poisson : planche anatomique d'appoint
- **Fichier source :** `Gills.jpg`
- **Ce que la source affirme :** « Gills »
- **Auteur :** United States Fish Commission — crédit déclaré : Bulletin of the United States Fish Commission United States Fish Commission url
- **Licence vérifiée :** Public domain (Public domain)
- **Page :** https://commons.wikimedia.org/wiki/File:Gills.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Gills.jpg/1920px-Gills.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1152 px (original déposé : 3794 × 2276)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Sert à dessiner la structure juste. Ne montre aucun état de fraîcheur.

### `74-05a-patate-saine.jpg`

- **Image visée :** 74-05 + 76-04 (planche fusionnée), pomme de terre : saine
- **Fichier source :** `Patates.jpg`
- **Ce que la source affirme :** « Different potato varieties. – The potato is the vegetable of choice in the United States. On average, Americans devour about 65 kg of them per year. New potato releases by ARS scientists give us even more choices of potatoes to eat. »
- **Auteur :** Scott Bauer, USDA ARS — crédit déclaré : This image was released by the Agricultural Research Service, the research agency of the United States Department of Agriculture, with the ID K9152-1 (next).
- **Licence vérifiée :** Public domain (Public domain)
- **Page :** https://commons.wikimedia.org/wiki/File:Patates.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg (original)
- **Dimensions :** 2864 × 1861 px (original déposé : 2864 × 1861)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Plusieurs variétés dans le cadre ; recadrer sur un tubercule. Agence fédérale américaine (USDA ARS, ID K9152-1) : domaine public.

### `74-05b-patate-verdissement-leger.jpg`

- **Image visée :** 74-05 + 76-04, pomme de terre : verdissement léger ou partiel
- **Fichier source :** `Potato Color Change.jpg`
- **Ce que la source affirme :** « Shows effects of several days of sunlight exposure on potato. Potato also likely has elevated levels of toxic solanine from light exposure. »
- **Auteur :** SciThreads (« Own work »)
- **Licence vérifiée :** CC BY-SA 4.0 (Creative Commons Attribution-Share Alike 4.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Potato_Color_Change.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/5/56/Potato_Color_Change.jpg (original)
- **Dimensions :** 1080 × 801 px (original déposé : 1080 × 801)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Petite : 1080 px de large, soit 9 cm à 300 ppp, une vignette au plus. Verdissement localisé (« on pare ») ou général : à juger à l'œil. La solanine est une supposition de l'auteur (« likely ») : la légende ne la reprend pas.

### `74-05c-patate-verdissement-avance.jpg`

- **Image visée :** 74-05 + 76-04, pomme de terre : verdissement avancé
- **Fichier source :** `Groene aardappels 'Doré' (Solanum tuberosum 'Doré').jpg`
- **Ce que la source affirme :** « Picture taken by myself; (nl: Groene aardappels 'Doré') Solanum tuberosum 'Doré' green potatoes with high content of solanine » (texte de la page ; la description de l'API est vide)
- **Auteur :** Rasbak (versé le 27 juillet 2006 ; aucun champ auteur dans les métadonnées)
- **Licence vérifiée :** CC BY-SA 3.0 (Creative Commons Attribution-Share Alike 3.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Groene_aardappels_%27Dor%C3%A9%27_(Solanum_tuberosum_%27Dor%C3%A9%27).jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Groene_aardappels_%27Dor%C3%A9%27_%28Solanum_tuberosum_%27Dor%C3%A9%27%29.jpg/1920px-Groene_aardappels_%27Dor%C3%A9%27_%28Solanum_tuberosum_%27Dor%C3%A9%27%29.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1440 px (original déposé : 2272 × 1704)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Pas d'auteur lisible par machine. La page dit « Picture taken by myself », et l'historique du fichier montre qu'il a été versé par Rasbak le 27 juillet 2006 : l'attribution est « Rasbak ». Le bandeau de la page est GFDL avec migration vers CC BY-SA 3.0 ; l'API donne CC BY-SA 3.0, ce qui concorde avec le registre de candidates (« CC BY-SA 3.0 et GFDL 1.2 »). « High content of solanine » est une affirmation de l'auteur, pas une mesure : la légende dit « verdissement avancé ».

### `74-05d-patate-germes.jpg`

- **Image visée :** 74-05 + 76-04, pomme de terre : germes
- **Fichier source :** `Potato with sprouts.jpg`
- **Ce que la source affirme :** « Potato with sprouts. Russet variety. About 10 centimeters (4 inches) in length. »
- **Auteur :** ZooFari (« Own work »)
- **Licence vérifiée :** Public domain (Public domain)
- **Page :** https://commons.wikimedia.org/wiki/File:Potato_with_sprouts.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Potato_with_sprouts.jpg/1920px-Potato_with_sprouts.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1440 px (original déposé : 3840 × 2880)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Un seul tubercule, et il n'est pas vert : la troisième vignette (à la fois très vert et germé) demande toujours deux photos ou un dessin.

### `75-02a-haricot-gousses-semence.jpg`

- **Image visée :** 75-02, maturité de la graine : colonne haricot, gousse sèche
- **Fichier source :** `Buschbohnen Samengewinnung-Josef Schlaghecken.jpg`
- **Ce que la source affirme :** « Bush beans (Phaseolus vulgaris subsp. nanus) plant with ripe pods for seed production. »
- **Auteur :** Schlaghecken Josef (« Own work »)
- **Licence vérifiée :** CC BY-SA 4.0 (Creative Commons Attribution-Share Alike 4.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Buschbohnen_Samengewinnung-Josef_Schlaghecken.jpg
- **Téléchargé :** https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Buschbohnen_Samengewinnung-Josef_Schlaghecken.jpg/3840px-Buschbohnen_Samengewinnung-Josef_Schlaghecken.jpg (vignette 3840 px renvoyée par l'API)
- **Dimensions :** 3840 × 2880 px (original déposé : 4608 × 3456)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Plant laissé sur pied pour la semence. Le stade intermédiaire « jaune » n'apparaît dans aucune description.

### `75-02c-concombre-trop-mur.jpg`

- **Image visée :** 75-02, maturité de la graine : colonne concombre, maturité de semence
- **Fichier source :** `Overripe cucumbers.jpg`
- **Ce que la source affirme :** « Overripe cucumbers »
- **Auteur :** Fumikas Sagisavas (« Own work »)
- **Licence vérifiée :** CC0 (Creative Commons Zero, Public Domain Dedication)
- **Page :** https://commons.wikimedia.org/wiki/File:Overripe_cucumbers.jpg
- **Téléchargé :** https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Overripe_cucumbers.jpg/3840px-Overripe_cucumbers.jpg (vignette 3840 px renvoyée par l'API)
- **Dimensions :** 3840 × 2880 px (original déposé : 4000 × 3000)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** « Overripe » peut vouloir dire trop mûr pour la table sans être jaune-brun dur : à juger à l'œil.

### `75-02d-laitue-fleur-aigrette.jpg`

- **Image visée :** 75-02, maturité de la graine : colonne laitue, fleur et aigrette
- **Fichier source :** `Starr-110601-5991-Lactuca sativa-flowers and seedheads-Kula-Maui (24728830399).jpg`
- **Ce que la source affirme :** « Lactuca sativa (Lettuce, prickly lettuce) Flowers and seedheads at Kula, Maui, Hawaii. June 01, 2011 #110601-5991 Includes Lactuca serriola. »
- **Auteur :** Forest and Kim Starr — crédit déclaré : starr-110601-5991-Lactuca_sativa-flowers_and_seedheads-Kula-Maui
- **Licence vérifiée :** CC BY 3.0 us (Creative Commons Attribution 3.0 us)
- **Page :** https://commons.wikimedia.org/wiki/File:Starr-110601-5991-Lactuca_sativa-flowers_and_seedheads-Kula-Maui_(24728830399).jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/0/0a/Starr-110601-5991-Lactuca_sativa-flowers_and_seedheads-Kula-Maui_%2824728830399%29.jpg (original)
- **Dimensions :** 2736 × 3648 px (original déposé : 2736 × 3648)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** **Réserve d'identification relevée à la source :** la page nomme *Lactuca sativa*, mais écrit aussi « Lettuce, prickly lettuce » et « Includes Lactuca serriola » (laitue sauvage). Le registre de candidates jugeait les photos de Kula moins exposées à cette confusion que celle de Kealia : la page elle-même la pose. Le jardinier semencier tranche.

### `75-03a-courge-fleur-femelle.jpg`

- **Image visée :** 75-03, pollinisation de la courge : fleur femelle (paire Starr, recommandée pour l'impression)
- **Fichier source :** `Starr 080815-9761 Cucurbita pepo.jpg`
- **Ce que la source affirme :** « Cucurbita pepo (acorn squash female flower). Location: Maui, Makawao »
- **Auteur :** Forest & Kim Starr — crédit déclaré : Plants of Hawaii, Image 080815-9761 from http://www.hear.org/starr/plants/images/image/?q=080815-9761
- **Licence vérifiée :** CC BY 3.0 (Creative Commons Attribution 3.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Starr_080815-9761_Cucurbita_pepo.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Starr_080815-9761_Cucurbita_pepo.jpg/1920px-Starr_080815-9761_Cucurbita_pepo.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1440 px (original déposé : 2816 × 2112)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Même plant, même jour, même auteur que `75-03b-courge-fleur-male.jpg`.

### `75-03b-courge-fleur-male.jpg`

- **Image visée :** 75-03, pollinisation de la courge : fleur mâle, tige nue (paire Starr)
- **Fichier source :** `Starr 080815-9762 Cucurbita pepo.jpg`
- **Ce que la source affirme :** « Cucurbita pepo (acorn squash male flower). Location: Maui, Makawao »
- **Auteur :** Forest & Kim Starr — crédit déclaré : Plants of Hawaii, Image 080815-9762 from http://www.hear.org/starr/plants/images/image/?q=080815-9762
- **Licence vérifiée :** CC BY 3.0 (Creative Commons Attribution 3.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Starr_080815-9762_Cucurbita_pepo.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Starr_080815-9762_Cucurbita_pepo.jpg/1920px-Starr_080815-9762_Cucurbita_pepo.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1440 px (original déposé : 2816 × 2112)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Même plant, même jour, même auteur que `75-03a-courge-fleur-femelle.jpg`.

### `75-03c-courge-femelle-ovaire-stylo.jpg`

- **Image visée :** 75-03, pollinisation de la courge : fleur femelle, ovaire visible (référence recommandée pour le dessin)
- **Fichier source :** `Cucurbita pepo 'Zucchini Grey' (semillería Florensa) - Vegetable Marrow Group, feminine flower and pen.jpg`
- **Ce que la source affirme :** « On the right a flower, the rest are feminine (female) flower buds. Notice size and shape of the ovary characteristic of Vegetable Marrow group. Seeds are sold in Argentina under the name "Zapallito alargado de Génova" or "Zucchini Grey" by the brand Florensa, ciudad de Córdoba, provincia de Córdoba, Argentina. »
- **Auteur :** RoRo (« Own work »)
- **Licence vérifiée :** CC0 (Creative Commons Zero, Public Domain Dedication)
- **Page :** https://commons.wikimedia.org/wiki/File:Cucurbita_pepo_%27Zucchini_Grey%27_(semiller%C3%ADa_Florensa)_-_Vegetable_Marrow_Group,_feminine_flower_and_pen.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cucurbita_pepo_%27Zucchini_Grey%27_%28semiller%C3%ADa_Florensa%29_-_Vegetable_Marrow_Group%2C_feminine_flower_and_pen.jpg/960px-Cucurbita_pepo_%27Zucchini_Grey%27_%28semiller%C3%ADa_Florensa%29_-_Vegetable_Marrow_Group%2C_feminine_flower_and_pen.jpg (vignette standard 960 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 960 × 604 px (original déposé : 1044 × 657)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Stylo dans le cadre, qui sert d'échelle ; l'ovaire est nommé par la source. **960 × 604 seulement** : l'original (1044 × 657) a été refusé par le serveur (HTTP 429) et 960 px est la plus grande vignette standard sous sa largeur. Référence pour l'illustrateur, pas pour l'impression.

### `75-03d-courge-male-femelle.jpg`

- **Image visée :** 75-03, pollinisation de la courge : mâle et femelle dans le même cadre
- **Fichier source :** `Male and Female Pumpkin Flowers.jpg`
- **Ce que la source affirme :** « Male flower (top) and female flower (bottom) of a pumpkin plant »
- **Auteur :** Mad.madrasi — crédit déclaré : Flowers on Pumpkin plant on my rooftop container garden in Chennai
- **Licence vérifiée :** CC BY-SA 3.0 (Creative Commons Attribution-Share Alike 3.0)
- **Page :** https://commons.wikimedia.org/wiki/File:Male_and_Female_Pumpkin_Flowers.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Male_and_Female_Pumpkin_Flowers.jpg/1920px-Male_and_Female_Pumpkin_Flowers.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 1440 px (original déposé : 2048 × 1536)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** **Candidate 2** : la candidate 1 n'était pas accessible à une taille utile (voir « Écartées au téléchargement »). « Pumpkin » sans nom latin ; le crédit parle d'un potager en contenants sur un toit de Chennai.

### `75-03e-courge-pollinisation-main.jpg`

- **Image visée :** 75-03, pollinisation de la courge : le geste
- **Fichier source :** `Гарбуз Cucurbita - проведення штучного запилення.jpg`
- **Ce que la source affirme :** « Photo moment the breeding of Cucurbita - Cucurbita moschata »
- **Auteur :** Zenon Sych (« Own work »)
- **Licence vérifiée :** CC BY-SA 4.0 (Creative Commons Attribution-Share Alike 4.0)
- **Page :** https://commons.wikimedia.org/wiki/File:%D0%93%D0%B0%D1%80%D0%B1%D1%83%D0%B7_Cucurbita_-_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F_%D1%88%D1%82%D1%83%D1%87%D0%BD%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BF%D0%B8%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F.jpg
- **Téléchargé :** https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/%D0%93%D0%B0%D1%80%D0%B1%D1%83%D0%B7_Cucurbita_-_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F_%D1%88%D1%82%D1%83%D1%87%D0%BD%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BF%D0%B8%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F.jpg/1920px-%D0%93%D0%B0%D1%80%D0%B1%D1%83%D0%B7_Cucurbita_-_%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%BD%D1%8F_%D1%88%D1%82%D1%83%D1%87%D0%BD%D0%BE%D0%B3%D0%BE_%D0%B7%D0%B0%D0%BF%D0%B8%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F.jpg (vignette standard 1920 px, l'original ayant été refusé (HTTP 429))
- **Dimensions :** 1920 × 2560 px (original déposé : 2448 × 3264)
- **Date du téléchargement :** 23 septembre 2026
- **Réserve :** Date de prise inscrite : 9 janvier 2011, suspecte pour une courge en fleur en Ukraine (serre, ou horloge d'appareil mal réglée). *C. moschata* est une courge de saison longue. Le geste est le même : à faire voir au relecteur.
