# Câble d'acier et crochets — à quoi ressemblent les défauts (notes de bas de page du ch. 86)

- **Chapitre qui s'en sert :** 86 — Leviers, poulies, treuils (notes [^2], [^3], [^5])
- **Date de consultation :** 2026-09-24
- **Déjà au dossier et repris tel quel :** `86-cchst-cable-metallique-de-levage.md` (méthode du
  chiffon, longueur de commettage, câble courant, épissoir sous deux torons) ;
  `86-cnesst-greage-et-levage-guide-de-securite.md` (coques : boucle d'un câble non tendu,
  point faible permanent) ; `86-us-army-fm5-125-trepied-chevre-perches.md` (même manuel, autre
  chapitre).

---

## 1. US Army FM 5-125, *Rigging Techniques, Procedures, and Applications*, chapitre 1 « Rope »

- **Organisme :** Headquarters, Department of the Army — domaine public fédéral américain
- **URL (chapitre 1, PDF) :** https://www.globalsecurity.org/military/library/policy/army/fm/5-125/ch1.pdf
- **Texte intégral OCR (pour la liste de mise au rebut, p. 1-20) :**
  https://archive.org/download/RiggingTechniquesProceduresAndApplicationsFM51252001/
  (fichier « Rigging Techniques, Procedures, And Applications (FM 5-125)(2001)_djvu.txt »)
- **Captation :** `curl` + `pdftotext`, 2026-09-24

### Extraits intégraux

> « The core of wire rope may be constructed of fiber rope, independent wire rope, or a wire
> strand. »

> « FIBER-ROPE CORES The fiber-rope core can be of vegetable or synthetic fibers. »

> « INDEPENDENT, WIRE-ROPE CORES Under severe conditions, an independent, wire-rope core is
> normally used. This is actually a separate smaller wire rope that acts as a core and adds
> strength to the rope. »

> « KINKING When handling loose wire rope, small loops frequently form in the slack portion (see
> Figure 1-7). If you apply tension while these loops are in position, they will not straighten
> out but will form sharp kinks, resulting in unlaying of the rope. You should straighten out all
> of these loops before applying a load. After a kink has formed in wire rope, it is impossible to
> remove it. Since the strength of the rope is seriously damaged at the point where a kink occurs,
> cut out that portion before using the rope again. »

> « Replace the wire rope if there is evidence of "birdcage" damage due to shock unloading. See
> Figure 1-17. »

La figure 1-17 (« Unserviceable wire rope ») montre la cage d'oiseau, mais l'image n'a pas pu
être rendue ici (aucun outil de rendu PDF sur le poste) : **l'aspect n'est donc pas relevé de
première main.**

## 2. OSHA, 29 CFR 1910.179 (ponts roulants), critère de mise au rebut des crochets

- **URL :** https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.179
- **Captation :** `curl` (WebFetch refusé, HTTP 403), 2026-09-24
- Sert de source au **critère physique** seulement ; rien du texte réglementaire ne s'imprime.

> « For hooks with cracks or having more than 15 percent in excess of normal throat opening or
> more than 10° twist from the plane of the unbent hook refer to paragraph (l)(3)(iii)(a) of this
> section. »

## 3. Wikipédia (en), « Wire rope » — recoupement de l'âme

- **URL :** https://en.wikipedia.org/wiki/Wire_rope — WebFetch, 2026-09-24

> « The first is a fiber core, made up of synthetic material or natural fibers like sisal. »
> « The third type is independent wire rope core (IWRC), which is the most durable in all types
> of environments. »

---

## Ce que les notes du livre en tirent

| Note | Élément | Appui |
| --- | --- | --- |
| [^1] méthode du chiffon | Chiffon de coton promené lentement ; piquant qui accroche ; certains fils cassés sans piquant, inspection visuelle de tout le câble | CCHST (fiche 86 déjà au dossier) |
| [^2] gorge du crochet | Ouverture entre pointe et dos ; plus large de 15 % que la normale = ouvert ; pointe sortie de plus de 10° du plan = tordu | OSHA 1910.179 (§2). La comparaison avec un crochet identique qui n'a pas travaillé est la méthode du livre, calquée sur celle du câble (§4, pied à coulisse) |
| [^3] âme IWRC | Âme = cœur des torons ; IWRC = petit câble d'acier séparé ; âme textile = fibre végétale ou synthétique ; se voit au bout coupé ou en soulevant deux torons | FM 5-125 (§1), Wikipédia (§3), CCHST (épissoir sous deux torons) |
| [^4] commettage, câble courant/fixe | Longueur pour qu'un toron fasse le tour complet ; courant = sur poulie ou tambour | CCHST. « Câble fixe : tient sans défiler, comme un hauban » est la lecture du livre par opposition au câble courant |
| [^5] coque | Petite boucle dans le mou, refermée par la traction ; pli serré ; torons qui se défont ; ne s'enlève plus | FM 5-125 (§1), CNESST (déjà au dossier) |
| [^5] cage d'oiseau, cause | Charge relâchée d'un coup (« shock unloading ») | FM 5-125 (§1) |
| [^5] cage d'oiseau, aspect | Torons écartés de l'âme, câble gonflé et ajouré sur une courte longueur | **Non relevé de première main** : sens littéral du terme, et CCHST qui range le « ballonnement » à côté des « cages d'oiseaux ». `[À VÉRIFIER]` dans la note |
