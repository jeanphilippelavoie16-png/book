# Bureau de la statistique du Canada — Annuaires du Canada 1916-17, 1921 et 1954 : rendements du Québec d'avant les engrais de synthèse, et poids au boisseau

- **Organisme :** Statistique Canada (anciennement Bureau fédéral de la statistique), collection
  historique de l'*Annuaire du Canada* — officielle (fédérale)
- **URL :**
  - 1916-17, p. 197 : https://www66.statcan.gc.ca/fra/1916-17/191702250197_p.%20197.pdf
  - 1916-17, p. 202 : https://www66.statcan.gc.ca/fra/1916-17/191702300202_p.%20202.pdf
  - 1921 (anglais), p. 221 : https://www66.statcan.gc.ca/eng/1921/192102610221_p.%20221.pdf
  - 1954, « Poids et mesures et autres données interprétatives » :
    https://www66.statcan.gc.ca/fra/1954/195400170000_Poids%20et%20mesures%20et%20autres%20donnWW130WWes%20interprWW130WWtatives.pdf
- **Date de consultation :** 27 septembre 2026
- **Captation :** `curl`, HTTP 200 ; PDF d'une page chacun, enregistrés :
  `98-annuaire-canada-1916-17-p197.pdf`, `98-annuaire-canada-1916-17-p202.pdf`,
  `98-annuaire-canada-1921-p221.pdf`, `98-annuaire-canada-1954-poids-et-mesures.pdf`.
  Texte extrait par pypdf ; le tableau de la p. 202 sort mêlé à l'extraction et a été **reconstitué
  en vérifiant chaque ligne par le produit superficie × rendement = production** (voir « Lecture »).
- **Sert au chapitre :** 98, §5-A (rendements prudents), §5-F.

## Extraits intégraux

**1916-17, p. 197 (texte) :**

> « Dans l'ensemble, la récolte de pommes de terre fut encore mauvaise, par suite des conditions
> défavorables qui se produisirent dans Québec et Ontario, où le rendement moyen à l'acre fut de 131
> boisseaux au lieu de 149.66 en 1915 pour Québec »

**1916-17, p. 202, tableau 1 « Superficie, rendement, qualité et valeur des principales récoltes
agricoles du Canada, en 1915 et 1916 — suite », Québec** (colonnes : superficie en acres ;
rendement par acre en boisseaux ; production en boisseaux ; poids mesuré par boisseau en livres) :

| Récolte | Année | Acres | Boiss./acre | Production (boiss.) | Poids (lb/boiss.) |
| --- | --- | --- | --- | --- | --- |
| Blé de printemps | 1915 | 71 000 | 19.88 | 1 411 000 | 59.62 |
| | 1916 | 64 000 | 15.00 | 960 000 | 57.71 |
| Avoine | 1915 | 1 400 000 | 30.13 | 42 182 000 | 36.92 |
| | 1916 | 1 073 000 | 22.75 | 24 411 000 | 33.57 |
| Orge | 1915 | 85 000 | 26.53 | 2 255 000 | 48.79 |
| | 1916 | 72 800 | 20.00 | 1 456 000 | 46.67 |
| Seigle | 1915 | 8 700 | 16.71 | 145 000 | 55.90 |
| | 1916 | 8 300 | 14.25 | 118 000 | 53.97 |
| Pois | 1915 | 24 400 | 16.56 | 404 000 | 61.14 |
| | 1916 | 21 600 | 14.00 | 302 000 | 59.95 |
| Haricots | 1915 | 4 700 | 21.89 | 103 000 | 59.38 |
| | 1916 | 4 400 | 17.75 | 78 000 | 60.18 |
| Sarrasin | 1915 | 104 000 | 24.69 | 2 568 000 | 48.17 |
| | 1916 | 101 000 | 19.00 | 1 919 000 | 46.35 |
| Pommes de terre | 1915 | 117 000 | 149.66 | 17 510 000 | — |
| | 1916 | 112 000 | 131.00 | 14 672 000 | — |

**1921, p. 221, « Quebec—con. Potatoes »** : 1916 : 131.00 ; 1917 : 80.00 ; 1918 : 147.00 ;
1919 : 181.50 ; 1920 : 185.50 ; « Averages 1916-20 » : **151.75** boisseaux à l'acre (1921 : 162.50).

**1954, p. unique :**

> « Voici les poids et mesures utilisés au Canada pour les principales grandes récoltes [...] Livres
> par boisseau — Céréales — Blé 60 · Avoine 34 · Orge 48 · Seigle 56 · Sarrasin 48 · Graine de lin 56 ·
> Maïs 56 · Céréales mélangées 50 · Toutes autres 60 »

## Lecture

- **Vérification du tableau reconstitué** : 71 000 × 19,88 = 1 411 480 ≈ 1 411 000 ; 1 073 000 ×
  22,75 = 24 410 750 ≈ 24 411 000 ; 72 800 × 20,00 = 1 456 000 ; 8 300 × 14,25 = 118 275 ≈
  118 000 ; 21 600 × 14,00 = 302 400 ≈ 302 000 ; 112 000 × 131,00 = 14 672 000. Toutes les lignes
  retombent sur la production publiée.
- **Conversion en kg/ha** (1 lb = 0,45359 kg ; 1 acre = 0,40469 ha), avec le poids mesuré de
  chaque année pour les grains :

| Récolte | kg/ha 1915 | kg/ha 1916 | kg/m² |
| --- | --- | --- | --- |
| Blé de printemps | 1 328 | 970 | 0,10 à 0,13 |
| Avoine (grain vêtu) | 1 247 | 856 | 0,09 à 0,12 |
| Orge | 1 451 | 1 046 | 0,10 à 0,15 |
| Seigle | 1 047 | 862 | 0,09 à 0,10 |
| Pois | 1 135 | 941 | 0,09 à 0,11 |
| Haricots | 1 457 | 1 197 | 0,12 à 0,15 |
| Sarrasin | 1 333 | 987 | 0,10 à 0,13 |
| Pommes de terre (60 lb/boiss.) | 10 065 | 8 810 | 0,9 à 1,0 |

- **Le poids du boisseau de pommes de terre** n'est pas imprimé au tableau (tiret). Le livre prend
  60 lb, la valeur de la ligne « Toutes autres 60 » de l'annuaire de 1954 ; la moyenne 1916-1920
  (151,75 boisseaux) donne alors 10,2 t/ha, soit environ **1 kg/m²**. Lecture à confirmer : la ligne
  « Toutes autres » est rangée sous « Céréales ». Voir `98-NON-OBTENUES.md`.
- Ce sont des moyennes **provinciales** (le gros des surfaces est au sud du Québec), faites avec du
  fumier et des chevaux, sans fongicide ni engrais de synthèse courant : c'est le repère « champ
  ordinaire sans rien d'acheté » du chapitre, pas un plancher garanti pour la Côte-Nord.

## Ajout du 27 septembre 2026 (correction du ch. 98) — « Navets, etc. » et le boisseau de pommes de terre

**1916-17, p. 202, même tableau, Québec** (ligne relue dans l'extraction `pdftotext -layout`) :

| Récolte | Année | Acres | Boiss./acre | Production (boiss.) | Poids (lb/boiss.) |
| --- | --- | --- | --- | --- | --- |
| Navets, etc. | 1915 | 10 200 | 308.25 | 3 144 000 | — |
| | 1916 | 10 000 | 265.00 | 2 650 000 | — |

Vérification : 10 200 × 308,25 = 3 144 150 ≈ 3 144 000 ; 10 000 × 265 = 2 650 000.

Conversion, à **60 lb le boisseau** (la ligne « Toutes autres 60 » de 1954, la même valeur que pour
la pomme de terre) : 1915 : 308,25 × 60 × 0,45359 ÷ 4 046,86 = **2,07 kg/m²** ; 1916 : 265 × 60 ×
0,45359 ÷ 4 046,86 = **1,78 kg/m²**. Le chapitre écrit **1,8 à 2,1 kg/m²** comme rendement prudent
du navet et du rutabaga (« racines des champs »). Le poids du boisseau de navets n'est pas imprimé :
voir `98-NON-OBTENUES.md`. Au Québec, « navet » désigne couramment le rutabaga ; « Navets, etc. »
des annuaires regroupe les racines fourragères des champs.

**Le boisseau de pommes de terre : 60 lb dans l'usage canadien de 1874.** Le manuel de 1874
(`98-cfm-1874-manuel-fermier-canadien-extraits.txt`, p. 218-219) convertit lui-même ses récoltes :
« fourteen thousand and two pounds, or two hundred and thirty-three bushels » (14 002 ÷ 233 =
60,1 lb) ; « nine thousand three hundred and thirty-five pounds, or one hundred and fifty-five
bushels » (9 335 ÷ 155 = 60,2 lb). La conversion à 60 lb, donc le **0,9 à 1,0 kg/m²** de 1915-1916,
est confirmée par l'usage de l'époque.
