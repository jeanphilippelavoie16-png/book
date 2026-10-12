# Source — Ressources naturelles Canada, « Les systèmes éoliens autonomes : guide de l'acheteur »

- **Organisme :** Ressources naturelles Canada (RNCan), CANMET
- **URL :** https://ressources-naturelles.canada.ca/sites/www.nrcan.gc.ca/files/canmetenergy/files/pubs/WindEnergy_buyersguide_FR.pdf
- **Date de consultation :** 2026-09-23
- **Captation :** `curl`, PDF enregistré : `sources/18b-rncan-systemes-eoliens-autonomes-guide.pdf`,
  texte extrait par `pdftotext -enc UTF-8`
- **Sert au chapitre :** 18b (sections 2, 4, 9)

---

## Extraits intégraux

> « Pour qu'un système éolien présente un intérêt matériel, la vitesse annuelle moyenne doit
> atteindre 15 km/h minimum. »

> « Dans la plupart des espaces libres, la vitesse du vent augmente de 12 p. cent chaque fois
> qu'on double la hauteur du point de mesure. »

> « la quantité d'énergie contenue dans le vent est proportionnelle au cube de sa vitesse »

> « Une augmentation de 10 p. cent de la vitesse du vent peut entraîner une augmentation de
> 30 p. cent de la puissance de l'éolienne. »

> « si on double ce diamètre, la puissance quadruple. »

> « La quantité d'énergie disponible est approximativement de 16 p. cent plus élevée à – 20 °C
> qu'à + 20 °C. »

> « Il faut normalement que la vitesse du vent dépasse 15 km/h pour qu'une éolienne commence à
> produire de l'électricité. [...] La vitesse de « déclenchement », qui est la vitesse à laquelle
> l'éolienne s'arrête pour ne pas subir de dommages, est d'environ 70 km/h. »

> « Le maximum d'énergie qu'un système éolien idéal peut capter équivaut à environ 59 p. cent de
> l'énergie contenue dans le vent. »

> La tour « doit résister aux coups de foudre, aux vents les plus violents, à la grêle et à la
> formation de glace. »

> « si on augmente la hauteur de la tour de 10 à 50 mètres on peut doubler la quantité d'énergie
> éolienne disponible. »

> « Certains micro-systèmes, tels que ceux utilisés dans un but récréatif ou dans les chalets,
> peuvent être montés sur un simple poteau rigide. »

> « On se limite généralement à une décharge de 50 p. cent »

> « Les batteries d'automobiles (batteries au plomb conçues pour le démarrage, l'éclairage et
> l'allumage) ont une PDD trop faible et, installées dans un système éolien, elles risquent de
> faire défaut prématurément. »

---

## Calcul du rédacteur

Doubler la hauteur : vent × 1,12, puissance × 1,12³ = **× 1,40**.

## Chiffres retenus pour le chapitre 18b

| Chiffre | Usage |
| --- | --- |
| 15 km/h de moyenne annuelle au minimum | Section 9 (à comparer aux 14,2 km/h de l'aéroport de Sept-Îles) |
| +12 % de vent par doublement de hauteur, donc +40 % de puissance | Section 9 |
| Puissance au cube de la vitesse ; diamètre doublé = puissance × 4 | Section 9 |
| +16 % d'énergie à -20 °C par rapport à +20 °C | Section 9 |
| Démarrage vers 15 km/h, arrêt de protection vers 70 km/h | Section 9 |
| Batteries d'auto : trop peu de profondeur de décharge, meurent vite en cyclage | Sections 2, 4 |
| Décharge limitée à 50 % en règle générale | Section 5.4 |
