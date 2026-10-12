# Source — La plage basse d'un congélateur coffre « ordinaire » (non vendu pour le garage) : aucune valeur générale

- **Date de consultation :** 24 septembre 2026
- **Sert au chapitre :** 18b (étape 7). Recherche pour le `[À VÉRIFIER — plage basse d'un coffre
  ordinaire, modèle de JP]`. **Verdict : introuvable comme valeur générale** ; le modèle de JP
  n'est pas nommé au dossier.

---

## 1. Danby (fabricant canadien) — foire aux questions « Refrigeration »

- **URL :** https://danby.ca/faqs-categories/refrigeration/ (et la version américaine
  https://www.danby.com/en-us/faqs-categories/refrigeration/)
- **Captation :** `curl`, HTTP 200, page lue dans le dossier de travail de la session ; extraits
  intégraux ci-dessous

> « Can a freezer go in the garage? Yes. Many freezers are garage ready and can be installed in
> enclosed, unheated spaces. Refer to your owner's manual for details. »

> « What is a garage ready freezer? Garage ready means that the freezer is well insulated and
> equipped to handle temperature extremes in an enclosed garage. The exterior temperature range
> that garage ready freezers can operate within is 0F – 110F/-17C-43C. »

Rien sur la plage d'un coffre qui n'est pas « garage ready » : la page renvoie au manuel.

## 2. Frigidaire — guide « All about the Use & Care of your Freezer »

- **URL :** https://manuals.plus/electrolux/frigidaire-all-about-the-use-care-of-your-freezer-manual
  (copie du guide du fabricant ; aussi sur http://pdf.archiexpo.com/pdf/frigidaire/all-about-use-care-your-freezer/89340-101949.html)
- **Captation :** **refusée** (HTTP 403, vérification anti-robot sur les deux hôtes). Extrait
  obtenu par `WebFetch`, non enregistré en page complète : **à ne pas imprimer sur cette seule
  base**.

> « For the most efficient operation, the appliance should be located where surrounding
> temperatures will not exceed 110°F (43°C). Temperatures of 32°F (0°C) and below will NOT affect
> operation. »

## Ce que le chapitre en tire

- Aucune valeur générale pour « un coffre ordinaire ». Un fabricant (Frigidaire, extrait non
  enregistré) écrit même que le froid sous 0 °C n'affecte pas le fonctionnement de ses appareils.
  L'affirmation du chapitre « un coffre ordinaire descend moins bas » n'est donc **pas portée** par
  les sources : chaque manuel dit la sienne.
- Le garde-fou qui ne dépend d'aucun manuel est déjà dans le chapitre : le min-max du coffre
  (étape 8, section 6).
