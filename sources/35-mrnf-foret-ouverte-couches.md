# MRNF — Forêt ouverte : les couches de la carte interactive

- **Organisme :** Gouvernement du Québec, ministère des Ressources naturelles et des Forêts (MRNF)
- **Outil :** Forêt ouverte, carte interactive (application IGO2)
- **URL de l'outil :** https://www.foretouverte.gouv.qc.ca/
- **Fichiers lus (ce sont eux qui décrivent les couches, l'écran d'accueil ne les montre pas) :**
  - https://www.foretouverte.gouv.qc.ca/contexts/_contexts.json (liste des cartes thématiques)
  - https://www.foretouverte.gouv.qc.ca/contexts/_perturbation.json
  - https://www.foretouverte.gouv.qc.ca/contexts/_chasse.json
  - https://www.foretouverte.gouv.qc.ca/contexts/_faune.json
  - https://www.foretouverte.gouv.qc.ca/contexts/_chemins.json
  - https://www.foretouverte.gouv.qc.ca/contexts/_STF_DonneesQC.json
  - https://www.foretouverte.gouv.qc.ca/contexts/_carte_forestiere.json
  - https://www.foretouverte.gouv.qc.ca/config/config.json
- **Date de consultation :** 23 septembre 2026
- **Captation :** de première main, HTTP 200 pour chaque fichier. Les titres ci-dessous sont
  recopiés tels qu'ils figurent dans les fichiers de configuration servis par l'outil.
- **Sert au chapitre :** 35 — Lire le territoire autour du chalet (§3, §5 étapes 2 et 4).
  Comble le trou n° 5 de `35-NON-OBTENUES-pages-cherchees-sans-succes.md` (l'écran d'accueil
  « IGO2 » ne décrivait aucune couche).

---

## Extraits intégraux

### Les cartes thématiques proposées (`_contexts.json`)

« Téléchargement » · « Nouveautés » · « Aires protégées » · « Aménagement forestier » ·
« Certification forestière et droits forestiers » · « Chasse et piégeage » · « Chemins » ·
« Classification écologique » · « Faune » · « Forestière » · « Forêt privée » · « Lidar » ·
« Nord québécois » · « Opérations forestières » · « Perturbations de la forêt » ·
« Territoires et limites forestières du domaine public »

### Carte « Perturbations de la forêt » (`_perturbation.json`) — couches

« Feux de forêt » · « Feux de forêt (1890-2025) » · « Potentiel d'intensité et de propagation
des feux » · « Infrastructures en milieu forestier » · « Épidemies, chablis et verglas
(1920-2025) » · « Récolte et autres interventions sylvicoles » · « Changement du couvert
forestier détecté par imagerie satellitaire » · « Tordeuse des bourgeons de l'épinette » ·
« Peuplements écoforestiers »

Filtres de la couche « Peuplements écoforestiers » :
- « Type de couvert » : « Résineux », « Feuillu », « Mélangé »
- « Essence dominante » : « Épinettes », « Sapin », « Bouleau à papier », « Peupliers »,
  « Thuya », « Mélèze », « Pins », etc.
- « Densité du couvert » : « 80% et + », « 60-79% », « 40-59% », « 25-39% »
- « Hauteur » : « 0-2 m », « 2-4 m », « 4-7 m », « 7-12 m », « 12-17 m », « 17-22 m »,
  « 22 m et + »
- « Âge » : « 10 ans », « 30 ans », « 50 ans », « 70 ans », « 90 ans », « + de 100 ans »,
  « Jeune inéquienne ou irrégulier », « Vieux inéquienne ou irrégulier »
- « Terrains non forestiers ou improductifs » : « Dénudé humide », « Dénudé sec », « Aulnaie »,
  « Site inondé », « Terrain agricole », « Autres non forestiers »

### Carte « Chasse et piégeage » (`_chasse.json`) — couches

« Réseau routier » · « Municipalité » · « Cadastre du Québec » · « Bureaux de la Protection de
la faune du Québec » · « Districts de la Protection de la faune du Québec » · « Baux de
villégiature » · « Lit d'écoulement potentiel lidar » · « Hydrographie surfacique forestière » ·
« Courbe de niveau lidar » · « Zones de chasse » · « Récolte et autres interventions
sylvicoles » · « Classes de pente » (« A - Nulle 0 à 3% » … « F - Abrupte 41% et + »,
« S - Sommet ») · « Peuplements écoforestiers » · « Territoires fauniques structurés » ·
« Unité de gestion des animaux à fourrure » · « Terrain forestier par domanialité » ·
« Indice d'humidité topographique lidar (dégradé) » · « Statistiques de chasse » (« Orignal -
2023 », « Orignal - 2024 », « Orignal - 2025 », « Ours - Automne 2023 » … « Ours - Printemps
2025 », etc.)

### Carte « Faune » (`_faune.json`) — couches

« Habitats fauniques - Légaux » · « Habitats fauniques - Informationnels » · « Territoires
fauniques structurés » · « Zones de chasse » · « Unité de gestion des animaux à fourrure » ·
« Bureaux de la Protection de la faune du Québec » · « Espèces exotiques envahissantes »

### Carte « Chemins » (`_chemins.json`) — couches

« Chemins forestiers (AQréseau+) » · « Réseau routier »

### Carte « Territoires et limites forestières du domaine public » (`_STF_DonneesQC.json`)

« Limites forestières du domaine public » · « Territoires forestiers publics » · « Refuge
biologique » · « Écosystème forestier exceptionnel » · « Milieu humide d'intérêt » · « Forêt de
proximité » · « Unité d'aménagement » · « Terrain forestier par domanialité »

### Carte « Forestière » (`_carte_forestiere.json`) — couches

« Courbe de niveau lidar » · « Peuplements écoforestiers » · filtre des dépôts : « Dépôts
glaciaires », « Dépôts fluvio-glaciaires », « Dépôts organiques », « Dépôts marins »,
« Affleurements rocheux », etc.

### Autres couches offertes (`config.json`, extraits)

« Feuillets SNRC » · « Milieux humides » · « Milieu humide potentiel (MELCCFP) » ·
« Imagerie aérienne du gouvernement du Québec » · « Index historique (orthophotos) » ·
« Hydrographie » · « Bassins hydrographiques »

---

## Ce que le chapitre 35 en tire

| Besoin du chapitre | Couche | Ce que ça règle |
| --- | --- | --- |
| Dater une perturbation (l'« horloge » de la §3) | « Feux de forêt (1890-2025) », « Épidemies, chablis et verglas (1920-2025) », « Récolte et autres interventions sylvicoles » | l'année d'origine d'un brûlis, d'un chablis ou d'une coupe se lit sur la carte au lieu de se deviner |
| Voir si la repousse est encore à hauteur de gueule | « Peuplements écoforestiers », filtres « Hauteur » et « Âge » | classe de hauteur du peuplement, à contrôler sur place |
| Couche juridique (§5 étape 4) | « Terrain forestier par domanialité », « Territoires fauniques structurés », « Baux de villégiature », « Cadastre du Québec », « Zones de chasse » | qui tient quoi, secteur par secteur |
| Milieux humides et riverains | « Habitats fauniques - Légaux », « Milieux humides » | où sont les habitats protégés |
| Couche permanente | « Feuillets SNRC », « Courbe de niveau lidar », « Hydrographie » | quelle feuille commander |

## Limites

- Ce sont des titres de couches, pas le contenu des couches : l'outil se consulte à l'écran,
  secteur par secteur. Rien ici ne dit ce qu'il y a au chalet.
- Aucune couche ne donne une durée de productivité d'un brûlis pour l'orignal ou le lièvre.
