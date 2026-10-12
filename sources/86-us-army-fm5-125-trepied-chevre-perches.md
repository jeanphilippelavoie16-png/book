# US Army FM 5-125 — Rigging Techniques, Procedures, and Applications, chap. 5 (trépied, chèvre, mât de charge)

- **Organisme :** Headquarters, Department of the Army (États-Unis) — « Approved for public
  release; distribution is unlimited » (domaine public fédéral américain)
- **Titre :** FM 5-125, *Rigging Techniques, Procedures, and Applications*, chapitre 5, « Lifting
  and Moving Equipment », section I
- **URL (chapitre 5, PDF) :** https://www.globalsecurity.org/military/library/policy/army/fm/5-125/ch5.pdf
- **URL (manuel complet, texte OCR, pour le tableau 5-1 absent du texte du PDF) :**
  https://archive.org/details/RiggingTechniquesProceduresAndApplicationsFM51252001
- **Date de consultation :** 2026-09-23
- **Captation :** de première main — PDF téléchargé et converti en texte (`pdftotext`) ; tableau
  5-1 relevé dans le fichier `_djvu.txt` d'archive.org (OCR : l'alignement des colonnes est
  reconstruit, seule la ligne « 6 diameter » est retenue par le livre, voir plus bas)
- **Sert aux chapitres :** 86 (§5-A, trépied de perches) et 87 (§2, §8, §9.7)

---

## Extraits intégraux

### Mât de charge (gin pole) — proportion d'une perche, p. 5-1

> « It should be no longer than 60 times its minimum thickness because of its tendency to buckle
> under compression. A usable rule is to allow 5 feet of pole for each inch of minimum
> thickness. »

### Chèvre à deux pattes (shears) — p. 5-8

> « For heavy loads, the L/d should not exceed 60 because of the tendency of the legs to bend
> rather than to act as columns. »

> « Dig the holes at the points where the legs of the shears are to stand. »

> « Keep the legs from spreading by connecting them with rope, a chain, or boards. It may be
> necessary, under some conditions, to anchor each leg of the shears while erecting them to keep
> the legs from sliding in the wrong direction. »

> « Be sure to have the sling bearing against the spars and not on the shears lashing entirely. »

### Trépied — p. 5-4 à 5-7

> « A tripod consists of three legs lashed or secured at the top. The advantage of the tripod over
> other rigging installations is that it is stable and requires no guy lines to hold it in place.
> Its disadvantage is that the load can be moved only up and down. The load capacity of a tripod
> is about one and one-half times that of shears made of the same size material. »

Brêlage, méthode I (corde de fibre de 1 po ou moins) :

> « Since the strength of the tripod is affected directly by the strength of the rope and the
> lashing used, use more turns than described here for extra heavy loads and fewer turns for
> light loads. »

> « The spacing between spars should be about one-half the diameter of the spars. Leave space
> between the spars so that the lashing will not be drawn too tight when erecting the tripod. »

> « Make a clove hitch (using a 1-inch rope) around one of the outside spars about 4 inches above
> the lashing mark, and take eight turns of the line around the three spars »

> « Finish the lashing by taking two close frapping turns around the lashing between each pair of
> spars. [...] Do not draw the frapping turns too tight. »

Dressage :

> « Spread the legs of a tripod in its final position so that each leg is equidistant from the
> others. This spread should not be less than one-half nor more than two-thirds of the length of
> the legs. Use chain, rope, or boards to hold the legs in this position. You can lash a leading
> block for the fall line of the tackle to one of the legs. »

> « With the legs in this position, pass a sling over the cross so that it passes over the top or
> center leg and around the other two. »

> « Eight people should be able to raise an ordinary tripod into position. »

> « Place a rope or chain lashing between the tripod legs to keep them from shifting once they
> are in their final position. »

### Tableau 5-1 — « Safe capacity of spruce timber as gin poles » (p. 5-2)

Ligne retenue (la seule dont l'alignement OCR est sans ambiguïté) :

| Bois | 20 pi | 25 pi | 30 pi |
| --- | --- | --- | --- |
| 6 po de diamètre (épinette) | 5 000 lb | 3 000 lb | 2 000 lb |

> « Note: Safe capacity of each length of shears or tripod is seven-eights of the value given for
> a gin pole. »

**Contradiction interne de la source, notée :** le texte dit qu'un trépied porte « about one and
one-half times » une chèvre de même bois ; la note du tableau donne 7/8 de la valeur du mât pour
une chèvre **ou** un trépied. Le livre retient la note du tableau, la valeur la plus basse.

---

## Calculs du livre sur ces valeurs (aucun chiffre neuf)

- **Trépied d'épinette de 15 cm × 6 m :** 5 000 lb × 7/8 = 4 375 lb = **1 984 kg**, écrit « un peu
  moins de deux tonnes ».
- **Soixantième de la longueur au petit bout :** 3,5 m ÷ 60 = 5,8 cm → **6 cm** ; 4 m ÷ 60 =
  6,7 cm → **7 cm** (arrondis vers le haut).
- **Géométrie du trépied** (trois pieds à égale distance *s*, pattes de longueur *L*, rayon au
  sol *r* = *s*/√3, hauteur *h* = √(*L*² − *r*²)) :
  - *s* = ½ *L* : *r* = 0,289 *L*, *h* = 0,957 *L*, *r*/*h* = 0,302 ;
  - *s* = ⅔ *L* : *r* = 0,385 *L*, *h* = 0,923 *L*, *r*/*h* = 0,417.
  - Poussée horizontale par pied = (*W*/3) × *r*/*h* : de **0,100 *W*** à **0,139 *W*** —
    « du dixième au septième de la charge ».
  - Le pied tient seulement si le frottement statique ≥ *r*/*h* : de **30 à 42 %**, quel que
    soit le poids.
  - Sommet à 92–96 % de la longueur des pattes ; pour une bête de 3,00 m pendue par les jarrets,
    *L* ≥ 3,00 / 0,923 = 3,25 m → « au moins 3,3 m », avant gambrel, palan et dégagement.
  - Poussée par pied : quartier de 95 kg → 9,5 à 13,2 kg, écrit « de 10 à 14 kg » ; mâle de
    635 kg → 63,8 à 88,3 kg, écrit « de 64 à 89 kg » (arrondis vers le haut).
