# Défense nationale (Cadets du Canada) — Calculer la déclinaison magnétique

- **Organisme :** Gouvernement du Canada, ministère de la Défense nationale — Directeur des
  cadets. Guide pédagogique des Cadets de l'Aviation royale du Canada, niveau de qualification
  trois, publication A-CR-CCP-803/PF-002
- **Titre :** Chapitre 18, OREN 390 — Naviguer selon un itinéraire à l'aide d'une carte et d'une
  boussole ; Section 10, OCOM C390.05 — Calculer la déclinaison magnétique
- **URL :** https://app.cadets.gc.ca/cadet-publications/A-CR-CCP-803-PF-002/section-18_10_fr.html
- **Date de consultation :** 23 septembre 2026
- **Captation :** de première main, HTTP 200, texte relevé sur la page
- **Sert au chapitre :** 35 — Lire le territoire autour du chalet (§4, §5 étape 3, §6)

**Pourquoi cette page et pas le calculateur de RNCan.** Le calculateur de déclinaison du
Service géomagnétique du Canada ne répond plus : le 23 septembre 2026, les adresses
`geomag.nrcan.gc.ca/calc/mdcal-fr.php`, `www.geomag.nrcan.gc.ca/calc/mdcal-fr.php`,
`geomag.nrcan.gc.ca/calc/mfcal-fr.php`, `…/calc/calc-fr.php` et `…/calc/default-fr.php` ont toutes
répondu **404**, et ni la page d'accueil de Géomagnétisme Canada
(`geomag.nrcan.gc.ca/index-fr.php`) ni la page « Champ magnétique terrestre »
(`/mag_fld/default-fr.php`) n'offrent plus de lien vers un calculateur. La page
« Les modèles de référence du champ magnétique » (`/mag_fld/magref-fr.php`, consultée le même
jour) dit seulement : « On utilise les modèles de champ magnétique pour calculer la déclinaison
magnétique et d'autres composants, à l'aide de programmes » et « On s'entend généralement pour
dire que la précision générale de l'IGRF est meilleure que 1° pour la déclinaison ».
La méthode qui ne dépend d'aucun site est celle de la carte elle-même, décrite ci-dessous.

---

## Extraits intégraux

### L'enjeu, chiffré

> « Ne pas tenir compte de la déclinaison magnétique peut avoir une incidence sur la navigation,
> puisque le cadet peut dévier de l'itinéraire visé. Pour chaque degré de déclinaison magnétique
> non pris en compte, une personne peut dévier d'environ 17 mètres par kilomètre parcouru. »

### Les trois nords

> « La déclinaison magnétique représente la différence d'azimut entre le nord géographique et le
> nord magnétique, ou entre le nord du quadrillage et le nord magnétique. »

> « Depuis 2008, la ligne de déclinaison zéro traverse Baker Lake, le Nunavut, Churchill
> (Manitoba) et Sioux Lookout (Ontario). »

### Où la carte porte sa déclinaison

> « Le calcul de la déclinaison actuelle utilise l'information fournie dans le diagramme de
> déclinaison d'une carte et l'information imprimée directement en dessous. Ce diagramme se
> trouve le plus souvent dans la marge sur le côté droit de la carte. »

### La formule

> « Formule : déclinaison magnétique du quadrillage + [(année courante – année de l'information
> de déclinaison) × (variation annuelle)] = déclinaison courante »

> « 1 degré (°) = 60 minutes ('), semblable au calcul de l'heure (p. ex., 1 heure = 60
> minutes). Il est très important de se rappeler de ce rapport lorsqu'on règle la déclinaison
> magnétique à la déclinaison actuelle. C'est ici que se commettent de nombreuses erreurs. »

> « Variation annuelle. Se trouve dessous le diagramme de déclinaison et s'exprime en minutes. »

> « Si la variation annuelle augmente, il faut l'introduire dans la formule en tant que valeur
> positive. Si la variation annuelle diminue, il faut l'introduire dans la formule en tant que
> valeur négative. »

> « Déclinaison vers l'ouest. Lorsque le nord magnétique se trouve à l'ouest (à gauche) du nord
> du quadrillage dans le diagramme de déclinaison. »

> « Si la déclinaison actuelle calculée est une valeur négative, une déclinaison vers l'est
> deviendra une déclinaison vers l'ouest, et vice versa. »

### Exemple publié (à ne pas recopier comme valeur de terrain)

> « Déclinaison magnétique du quadrillage : 18° 18' » ; « Année de l'information de
> déclinaison : 1975 » ; « Variation annuelle : diminution de 1.4'. » ;
> « 18° 18' + [(2008 - 1975) x (-1.4')] » … « la déclinaison magnétique de la carte
> topographique en 2008 est une déclinaison magnétique de 17° 31.8' Ouest. »

---

## Chiffres retenus pour le chapitre 35

| Valeur | Objet | Statut |
| --- | --- | --- |
| **≈ 17 m de dérive par km et par degré** non corrigé | ordre de grandeur de l'erreur | sourcé |
| **diagramme de déclinaison dans la marge droite** de la carte topographique, avec l'année et la variation annuelle en minutes | d'où tirer la valeur sans Internet | sourcé |
| formule : valeur de la carte + (années écoulées × variation annuelle) | ramener la valeur à l'année en cours | sourcé |
| 1° = 60′ | l'erreur de calcul la plus fréquente | sourcé |

## Limites

- Guide d'instruction pour cadets, pas une publication du Service géomagnétique : c'est une
  méthode de terrain, pas un modèle. Plus la carte est vieille, plus l'extrapolation linéaire de
  la variation annuelle s'éloigne de la valeur vraie ; RNCan situe la précision des modèles de
  référence « meilleure que 1° ».
- Aucune valeur pour la Côte-Nord n'en est tirée, volontairement.
