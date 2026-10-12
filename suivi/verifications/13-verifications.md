> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 17. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 17 — Feu sans allumettes : levée des drapeaux `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026
- **Fichier vérifié :** `chapitres/17-feu-sans-allumettes.md` (lu, pas modifié)
- **Bilan :** 6 drapeaux — **2 LEVÉS**, **1 CORRIGÉ**, **3 INTROUVABLES**

« LEVÉ » couvre aussi un drapeau où le texte n'avait pas de valeur et où la source en fournit une :
la colonne « à faire » donne alors la valeur à insérer.

Sources nouvelles de cette passe (dans `sources/`, page enregistrée à côté de la fiche) :

- `17-butane-essence-proprietes.md` — NIOSH et NIST (gouvernement des États-Unis) : ébullition du
  butane et de l'isobutane, point d'éclair de l'essence
- `17-us-army-fm21-76-feu.md` — manuel de survie FM 21-76, chapitre du feu (PDF complet enregistré)
- `17-light-my-fire-tiges-ferrocerium.md` — fabricant, frappes par modèle de tige

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | § 2 C'est le bon choix quand, 1re puce — « Le propane bout à **-42,04 °C** (ch. 14) et travaille encore tout l'hiver ; le butane cesse de vaporiser bien avant [À VÉRIFIER]. » | **LEVÉ** — valeur fournie : le butane bout à **-0,5 °C** (31 °F ; 273 K au NIST), l'isobutane à **environ -11 °C** (262 K) ; « A liquid below 31°F » : sous ce point, le gaz reste liquide dans le réservoir | `17-butane-essence-proprietes.md` (+ `17-niosh-npg-n-butane.html`, `17-nist-webbook-C106978.html`, `17-nist-webbook-C75285.html`) | « Le propane bout à **-42,04 °C** (ch. 14) et travaille encore tout l'hiver ; le butane bout vers **0 °C**, et même l'isobutane vers **-11 °C** : sous ce point, le gaz reste liquide dans le réservoir et il ne sort presque plus rien. » | ✔ appliqué
| 2 | § 4 Matériel, 1re ligne — « Tige de ferrocérium, 8 mm de diamètre ou plus [À VÉRIFIER] \| 1 par sac, 3 au chalet » | **INTROUVABLE** — aucun diamètre publié, ni par le fabricant consulté ni ailleurs. Ce que le fabricant chiffre, c'est la durée : la grosse tige donne jusqu'à **12 000 frappes**, la petite du même fabricant **3 000** ; l'étincelle marche mouillée et au vent | `17-light-my-fire-tiges-ferrocerium.md` (+ `17-light-my-fire-firesteel-scout.html`, `17-light-my-fire-firesteel-army.html`) — fabricant | Item sans diamètre : « Tige de ferrocérium, **le plus gros modèle** qu'on trouve ». Et, si on veut garder la raison, sous le tableau : « La grosseur de la tige, c'est sa durée : chez le même fabricant, la grosse donne quatre fois plus de frappes que la petite, de l'ordre de 12 000 contre 3 000. » | ✔ appliqué
| 3 | § 8 DANGER, « Jamais d'accélérant » — « Le froid ne protège pas : l'essence dégage encore de la vapeur inflammable bien en dessous de zéro [À VÉRIFIER], et un bidon ouvert du côté du feu en plein hiver se comporte comme un bidon ouvert en juillet. » | **LEVÉ** — valeur fournie : point d'éclair de l'essence **-45 °F, soit -43 °C** ; limites d'inflammabilité 1,4 à 7,6 % dans l'air | `17-butane-essence-proprietes.md` (+ `17-niosh-npg-essence.html`) — NIOSH, gouvernement des États-Unis ; définition du point d'éclair : `88-cchst-point-declair-glossaire-simdut.md` (reprise) | « Le froid ne protège pas : l'essence dégage assez de vapeur pour s'enflammer jusqu'à **-43 °C**, et un bidon ouvert du côté du feu en plein hiver se comporte comme un bidon ouvert en juillet. » — Le chiffre peut aussi servir au ch. 20 et au ch. 83, qui notaient ce trou (`20-cchst-essence-vapeurs.md`, `83-cchst-garages-securite-essence.md`) | ✔ appliqué
| 4 | § 9, « La boîte à braise » — « Compter une demi-journée de marche [À VÉRIFIER], et ouvrir à chaque arrêt » | **INTROUVABLE** — aucune durée de braise transportée dans les sources. Le manuel de l'armée américaine confirme la pratique (« Carry lighted punk, when possible » : transporter du bois pourri allumé) sans donner de durée | `17-us-army-fm21-76-feu.md` (pratique seulement) | Dire la même chose sans la durée : « La durée dépend de la braise, du bois pourri et du vent : on ne la connaît qu'en l'ayant essayée. Ouvrir à chaque arrêt — plus de fumée au trou, plus de braise — et l'apprendre en plein jour, sur un court trajet, avant de s'y fier pour un long. » | ✔ appliqué
| 5 | § 9, « L'amadouvier travaillé » — « Les concentrations de lessive et de salpêtre sont à établir par essai [À VÉRIFIER : aucune source officielle]. » | **INTROUVABLE** — aucune concentration de lessive ni de salpêtre trouvée dans une source officielle ou technique pour la préparation de l'amadou. La phrase ne porte pas de chiffre : elle dit déjà ce qu'il faut faire | — | Garder la phrase sans le drapeau, en disant le critère d'essai : « Les concentrations de lessive et de salpêtre se règlent par essai : un bout de feutre trempé puis séché, une étincelle, et on regarde s'il prend et combien de temps il garde le point rouge. » | ✔ appliqué
| 6 | § 9, « L'arc à feu » — « Ordres de grandeur : planchette d'environ 1,5 à 2 cm d'épaisseur, foret de 20 à 30 cm de long et de 2 cm de diamètre, encoche ouverte d'environ le huitième de la circonférence [À VÉRIFIER pour l'ensemble de ces dimensions — à valider par essai réel, aucune source officielle] » | **CORRIGÉ** — foret : texte 20 à 30 cm × 2 cm, source **environ 25 cm × 2 cm** (tient) ; planchette : texte 1,5 à 2 cm, source **environ 2,5 cm** d'épaisseur et 10 cm de large, creux à 2 cm du bord ; encoche : **aucune fraction de circonférence** dans la source, seulement « une entaille en V du bord de la planchette jusqu'au creux » | `17-us-army-fm21-76-feu.md` (+ `17-us-army-fm21-76-survie.pdf`) — manuel de survie de l'armée américaine, domaine public | « Ordres de grandeur : planchette d'environ **2,5 cm** d'épaisseur et 10 cm de large, le creux à 2 cm du bord ; foret d'environ **25 cm** de long et **2 cm** de diamètre, le bout du haut arrondi et celui du bas plat ; encoche en V taillée du bord de la planchette jusqu'au centre du creux. » — Voir la note A : la source veut un foret de bois dur sur une planchette de bois tendre | ✔ appliqué

## Notes hors drapeau — à transmettre à l'éditeur

**A — Arc à feu : le bois du foret (ligne 6).** Le chapitre dit « un foret de bois tendre et sec, une
planchette de la même essence ». Le manuel de l'armée américaine dit l'inverse pour le foret :
« a straight, seasoned **hardwood** stick » sur « a seasoned **softwood** board ». Les essences que le
chapitre nomme (thuya, tremble, sapin) sont toutes des bois tendres ; la source ne nomme aucune essence.
Ce n'est pas un chiffre, mais c'est une consigne qui contredit la seule source du dossier : à trancher
par l'éditeur (« foret d'un bois au moins aussi dur que la planchette », ou garder « même essence » en
disant que la source dit autrement).

**B — Arc à feu : la corde.** Le chapitre dit que le nylon lisse ne travaille pas. La source dit
« The bowstring can be any type of cordage ». Pas de drapeau, pas de chiffre ; le chapitre peut garder
sa remarque, qui porte sur la prise de la corde sur le foret, pas sur sa nature.

**C — Le point d'éclair de l'essence (ligne 3) sert ailleurs.** Les fiches `20-cchst-essence-vapeurs.md`
et `83-cchst-garages-securite-essence.md` notaient qu'aucune page n'avait confirmé le -43 °C. C'est
fait : `17-butane-essence-proprietes.md`.

**D — Pierre et acier.** La même source confirme deux phrases du § 9 qui n'avaient pas de drapeau :
l'acier inoxydable « will not produce a good spark », et l'amadou carbonisé « holds a spark for long
periods » et se garde dans une boîte étanche.
