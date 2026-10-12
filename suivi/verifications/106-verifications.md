> **Renuméroté une deuxième fois le 27 septembre 2026** (agriculture au tome 5) : chapitre 102 avant cette date. Table : plan/renumerotation-2.json.

> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 83. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 83 — Scie à chaîne et petits moteurs : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026
- **Fichier vérifié :** `chapitres/83-scie-a-chaine-et-petits.md` (lu, pas modifié)
- **Bilan :** 5 drapeaux — **2 LEVÉS**, **1 CORRIGÉ**, **2 INTROUVABLES** (le délai « en quelques minutes », deux fois)

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer. Les numéros suivent l'ordre
des drapeaux dans le chapitre.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §5, étape 25 (bois sous tension) : « La règle est de **couper en deux temps** : d'abord du côté comprimé, sur environ le tiers `[À VÉRIFIER]`, puis du côté tendu, en se plaçant hors de l'arc de détente. Le tiers est un repère de métier » | **LEVÉ** — « make a cut a third of the trunk's diameter. This cut should be made on the side of the trunk that is going to be exposed to the most compression […]. Once the first meeting cut has been made you can continue from the opposite side of the trunk until the two cuts meet. » Le fabricant donne aussi le pourquoi : sans ce trait, le tronc éclate, et c'est du côté comprimé que le guide se fait pincer | `sources/83-husqvarna-tronconnage-bois-sous-tension.md` (page du fabricant enregistrée) | « La règle est de **couper en deux temps** : d'abord du côté comprimé, sur le tiers du diamètre — c'est là que le guide se fait pincer, et sans ce trait le tronc éclate —, puis du côté tendu jusqu'à rejoindre le premier trait, en se plaçant hors de l'arc de détente. L'arc de détente, lui, ne se devine qu'en suivant des yeux la courbe du bois plié jusqu'à son point d'appui. » (La phrase « Le tiers est un repère de métier » saute : c'est la valeur du fabricant.) | ✔ appliqué
| 2 | §5-G, étape 40 (réglages de carburateur) : « Les vis de richesse existent, elles se dérèglent, et un réglage trop pauvre grippe un moteur deux temps en quelques minutes `[À VÉRIFIER]` de pleine charge. » | **INTROUVABLE** pour le délai — le fabricant confirme le mécanisme, pas le temps : « If the setting is too lean there is a risk of engine damage due to insufficient lubrication and overheating. » Aucune durée | `sources/83-stihl-melange-trop-pauvre.md` (manuel STIHL MS 250, page enregistrée) | **Dire la même chose sans le délai** : « Les vis de richesse existent, elles se dérèglent, et un réglage trop pauvre grippe un moteur deux temps : il chauffe et manque d'huile en même temps, parce que son huile arrive avec l'essence. Dans le doute, on règle du côté riche. » | ✔ appliqué
| 3 | §7, tableau, ligne « Le moteur **monte en régime puis retombe** » : « Arrêter immédiatement. Un deux temps trop pauvre grippe en quelques minutes `[À VÉRIFIER]` de pleine charge » | **INTROUVABLE** — même source, même constat que la ligne 2 : surchauffe et manque de lubrification, sans délai | `sources/83-stihl-melange-trop-pauvre.md` | **Dire sans le délai** : « Arrêter immédiatement. Un deux temps trop pauvre chauffe et manque d'huile : c'est comme ça qu'il grippe. » — Voir aussi la note A sur le diagnostic de cette ligne | ✔ appliqué
| 4 | §8 DANGER, point 2 (la coupe à la cuisse) : « L'artère fémorale passe à l'intérieur de la cuisse, superficiellement `[À VÉRIFIER]`, exactement dans la trajectoire d'une scie qui rebondit » | **CORRIGÉ** (précisé) — texte : superficielle, sans dire où ; source : superficielle **dans le haut de la cuisse seulement**, sous le pli de l'aine, où « the roof of the femoral triangle […] is composed of skin, subcutaneous tissue, superficial fascia, and deep fascia » ; plus bas, elle passe **sous le couturier**, dans le canal des adducteurs au tiers moyen de la cuisse, puis derrière le genou | `sources/83-statpearls-artere-femorale-trajet.md` (deux articles StatPearls / NCBI enregistrés depuis l'Internet Archive, le NCBI renvoyant un reCAPTCHA) | « L'artère fémorale descend à l'avant et à l'intérieur de la cuisse. Dans le haut, sous le pli de l'aine, elle n'est couverte que par la peau, le gras sous la peau et deux feuillets de membrane ; plus bas, elle passe sous un muscle et file vers l'arrière du genou. Le haut de la cuisse est exactement dans la trajectoire d'une scie qui rebondit ou qui glisse au retrait. » | ✔ appliqué
| 5 | §9, « L'étincelle faible » : « L'épaisseur exacte est propre au moteur `[À VÉRIFIER]`, mais une bobine qui frotte le volant ne donne rien et une bobine trop loin non plus. » | **LEVÉ** (valeur fournie) — « An ignition armature must be set at a precise distance from the flywheel. Your engine repair manual will provide the proper gap for your engine. […] Common armature gap ranges are .006 - .010" and .010 - .014" », soit **0,15 à 0,25 mm** ou **0,25 à 0,36 mm** selon le moteur ; « Armatures are often packaged with a thick piece of paper to assist in setting the gap ». La manœuvre du chapitre (vis desserrée, cale, aimants qui tirent la bobine, vis reprises) est celle du fabricant | `sources/83-briggs-entrefer-bobine-allumage.md` (page du fabricant enregistrée) | « L'épaisseur exacte est propre au moteur ; sur les moteurs courants, elle va de 0,15 à 0,36 mm — l'épaisseur d'un papier épais, et c'est d'ailleurs un papier épais que le fabricant glisse dans l'emballage d'une bobine neuve pour servir de cale. Une bobine qui frotte le volant ne donne rien, et une bobine trop loin non plus. » | ✔ appliqué

## Notes

**A — Le diagnostic de la ligne 3 (§7, « monte en régime puis retombe »).** Hors drapeau, mais
à signaler : la fiche `sources/83-wikipedia-four-stroking.md` note déjà que le « quatre-temps »
est associé, par les guides consultés, à un réglage **riche** de la vis H, et non pauvre. La ligne
du tableau attribue le cycle « quatre-temps puis emballement » d'abord à un mélange trop pauvre.
Le manuel STIHL enregistré ce jour (`sources/83-stihl-melange-trop-pauvre.md`) ne décrit pas le
son ; il ne tranche donc pas. Le diagnostic de cette ligne reste à revoir par le vérificateur
technique : elle mêle peut-être deux pannes (riche : bafouillement ; pauvre : emballement,
surchauffe).

**B — Le budget de recherche web** de la session s'est épuisé au milieu du chapitre 83 (après
la ligne 3). La ligne 5 a été réglée par le plan du site du fabricant (`sitemap.xml`), pas par
une recherche.
