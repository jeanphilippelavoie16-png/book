# ACIA — Nitrites dans le saumurage des produits de viande

- **Organisme :** Agence canadienne d'inspection des aliments (ACIA)
- **Titre de la page :** Recommandations de contrôles préventifs pour l'utilisation de nitrites
  dans le saumurage de produits de viande
- **URL :** https://inspection.canada.ca/controles-preventifs/produits-de-viande/nitrites/fra/1522949763138/1522949763434
- **URL courte équivalente :** https://inspection.canada.ca/fr/controles-preventifs/produits-viande/nitrites
- **Base réglementaire citée :** Règlement sur les aliments et drogues
- **Date de consultation :** 2026-09-20
- **Capture :** de première main, `WebFetch`, HTTP 200, deux passes (limites, puis injection)
- **Chapitre qui s'en sert :** 64 — Saumure (sections 3, 4, 5, 6, 8, 10)
- **Déjà au dossier :** `12-acia-nitrites-salpetre.md`, `62-acia-nitrites-saumurage.md`,
  `63-acia-nitrites-produits-de-viande.md`. Mêmes extraits, recaptés indépendamment le
  2026-09-20. **Les quatre captations concordent.**

---

## Extraits intégraux — les limites

> « la quantité maximale de sel de nitrite de sodium pouvant être ajoutée est de 20 g par
> 100 kg »

> « sans dépasser la limite maximale permise (200 ppm) »

> « le niveau maximum d'apport en nitrite de sodium est de 12 g par 100 kg de flanc »

> « jusqu'à 20 g de nitrate de sodium par 100 kg de viande »

> « 62 g de sel de nitrite de sodium et 186 g de sel de nitrate par 100 kg »

## Extrait intégral — la définition réglementaire du mot « saumuré »

> « le terme "saumuré" qualifie le produit de viande [...] auquel du sel avec au moins
> **100 ppm** de nitrite ou de nitrate »

C'est l'extrait le plus important pour le chapitre 64 : il donne un **plancher**, pas
seulement un plafond. Entre 100 et 200 ppm, il y a une fenêtre, et c'est dans cette fenêtre
que le chapitre fait travailler le lecteur.

## Extraits intégraux — saumurage par injection et calcul du gain

> « ppm nitrite = (poids de nitrite en kg ÷ poids de la saumure en kg) × [(gain × 10⁶) ÷
> (gain + 100)] »

> « ppm nitrite = [(poids de nitrite en g × gain en kg) ÷ poids de la saumure en kg] ÷
> (100 kg + gain en kg) »

Exemple chiffré de la page : un **gain de 15 kg** pour 100 kg de viande, soit un poids après
injection de **115 kg**, et le calcul donne **200 ppm**. La page écrit le gain ainsi :

> « % Injection (gain) = 15 »

## Extraits intégraux — saumurage lent et poudre de céleri

> « Les nitrates sont lentement convertis par l'action bactérienne en nitrite »

> « le produit de viande est frotté avec une préparation de nitrate ou trempé dans une
> préparation de nitrate et d'eau, pendant plusieurs jours ou plusieurs semaines »

> « La poudre de jus de céleri non convertie [...] peut être utilisée comme source de nitrite
> dans le cadre du processus de saumurage lent »

> « Cette méthode ne peut pas être utilisée pour produire des produits de volaille ou d'autres
> produits de viande saumurés par injection ou immersion »

> « Si cet ingrédient constitue plus de 10 % du poids du lot, il est généralement nécessaire de
> recalculer »

---

## Ce que la page NE dit PAS — vérifié ligne par ligne

Un chapitre sur la saumure est tenté de lui faire dire plus qu'elle ne dit :

- **aucune mention du mot « salpêtre »** ;
- **aucune mention de *Clostridium botulinum*** ni d'un rôle antibotulinique du nitrite. C'est
  une page de contrôle réglementaire, pas une page de microbiologie. Le chapitre 64 ne peut
  donc pas justifier le nitrite par le botulisme en citant cette page — il marque le point
  `[À VÉRIFIER]` et le porte au relecteur ;
- **aucune teneur de mélange commercial** (« sel rose », « sel de salaison ») ;
- **aucune durée d'immersion**, aucune température de saumure, aucune concentration de sel de
  la saumure elle-même ;
- **aucune dose toxique** du nitrite pur.

## Ce que le chapitre 64 en tire

1. Les limites sont des **niveaux d'incorporation dans le produit de viande**, en ppm de
   viande, jamais des dosages de sac. La conversion passe obligatoirement par la **teneur
   déclarée sur l'étiquette** du mélange employé.
2. **100 ppm est un plancher, 200 ppm un plafond.** Le chapitre dimensionne la saumure sur la
   masse totale viande + saumure, de sorte que même si toute la saumure entrait dans la viande,
   le plafond tiendrait.
3. La formule d'injection lie explicitement le ppm au **gain de masse**. C'est le seul calcul
   officiel au dossier qui relie une saumure à une pièce de viande, et c'est lui qui autorise
   le chapitre à traiter l'injection des pièces épaisses.
4. Nitrate et nitrite ont des limites **fixées séparément**, avec des valeurs différentes dans
   la même phrase (62 g contre 186 g). Deux produits qui se doseraient pareil n'auraient pas
   deux limites : c'est le fondement documenté de la règle de `CLAUDE.md` sur le salpêtre.
