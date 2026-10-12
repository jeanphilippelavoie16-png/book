# MAPAQ — Thermoguide+ : poissons, poissons fumés, aliments congelés, gibier sauvage

- **Organisme :** Gouvernement du Québec, ministère de l'Agriculture, des Pêcheries et de
  l'Alimentation (MAPAQ)
- **Outil :** Thermoguide+ — https://media.mapaq.gouv.qc.ca/thermoguideplus/#/
  (lien donné par la page Québec.ca « Durée de conservation des aliments »,
  https://www.quebec.ca/sante/alimentation/salubrite-aliments-prevention-risques/salubrite-aliments-domicile/conservation-aliments/duree-conservation,
  mise à jour le 14 février 2025)
- **Données :** l'outil est une application qui lit un seul fichier de données :
  https://media.mapaq.gouv.qc.ca/thermoguideplus/Aliments.json — **enregistré intégralement**
  dans `53-mapaq-thermoguideplus-aliments.json`
- **Consultée le :** 24 septembre 2026
- **Captation :** `curl`, HTTP 200 ; texte des fiches extrait du HTML contenu dans le JSON
- **Sert aux chapitres :** 53 — Truite et omble au lac (§5-B, étape 12) ; utile aux ch. 63, 71, 72

---

## Fiche « Poissons » — extraits intégraux

> « Durée d'entreposage au réfrigérateur (4 °C) :
> - Poissons gras crus (ex. : saumon, truite) : 1-2 jours
> - Poissons maigres crus (ex. : sole, tilapia) : 2-3 jours
> - Tartares, sushis et cévichés faits maison, achetés frais ou décongelés : 24 heures
> - Poissons cuits : 5-7 jours
> - Simili-crabe (goberge) : 5 jours »

> « Jetez les poissons présentant des signes d'altération comme une apparence douteuse, une
> texture gluante ou visqueuse, une mauvaise odeur, une couleur anormale ou des moisissures. »

> « Le jus de citron ou de lime et les sauces épicées ne tuent pas les bactéries, les parasites
> et les virus. »

> « Certaines personnes sont plus vulnérables que les autres aux maladies d'origine
> alimentaire. Les enfants de 5 ans et moins, les femmes enceintes, les adultes de 60 ans et
> plus ainsi que les personnes dont le système immunitaire est affaibli devraient éviter de
> consommer des poissons crus ou insuffisamment cuits. »

> « Ne décongelez jamais les poissons, qu'ils soient crus ou cuits, à la température ambiante. »

## Fiche « Poissons fumés » — extraits intégraux

> « Durée d'entreposage au réfrigérateur (4 °C) :
> - Poissons fumés du commerce achetés réfrigérés : selon la date « meilleur avant » indiquée
>   sur l'emballage
> - Poissons fumés faits maison non emballés sous vide : 7 jours
> - Poissons fumés faits maison emballés sous vide : ne doivent pas être conservés au
>   réfrigérateur »

> « Qu'ils soient faits maison ou qu'ils proviennent du commerce, les poissons fumés emballés
> sous vide doivent être conservés congelés jusqu'au moment de les consommer. »

> « Les poissons crus sont parfois porteurs de parasites. Si vous faites votre propre poisson
> fumé, privilégiez le fumage à chaud jusqu'à l'atteinte d'une température interne de 70 °C. »

## Fiche « Aliments congelés » — extraits intégraux

> « Maintenez les aliments congelés à une température égale ou inférieure à -18 °C. »

> « Avec le temps, les aliments congelés peuvent être desséchés par le froid, accumuler de la
> glace, perdre de leur saveur ou présenter une moins bonne valeur nutritive. Malgré cela, ils
> peuvent être consommés sans danger, peu importe leur durée d'entreposage au congélateur. Les
> aliments peuvent généralement y être conservés pendant plusieurs mois, voire plus d'une
> année, avant de présenter des signes de détérioration. »

> « Évitez de recongeler un aliment complètement décongelé sans l'avoir cuit avant. […] Il est
> toutefois possible de congeler de nouveau des aliments partiellement décongelés. »

## Fiche « Gibier sauvage » — extraits intégraux (pour mémoire, ch. 63)

> « Durée d'entreposage au réfrigérateur de la viande de gibier fraîche ou décongelée (4 °C) :
> - Viande crue intacte : 1-3 jours
> - Viande hachée crue : 1-2 jours
> - Viande cuite (seule ou dans un mets préparé) : 5-7 jours »

## Ce que la fiche permet d'écrire

- Truite ou omble crus au frigo à 4 °C : **1 à 2 jours** (la truite est donnée en exemple de
  poisson gras). Cuits : **5 à 7 jours**. Fumé maison non emballé sous vide : **7 jours** ;
  sous vide : congélateur seulement.
- Au congélateur à -18 °C ou moins : **aucune limite de salubrité**, la qualité baisse avec le
  temps.
