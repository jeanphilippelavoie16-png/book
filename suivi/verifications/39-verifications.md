> **Renuméroté le 24 septembre 2026** (six tomes) : ancien chapitre 07. Plus bas, les numéros de chapitre sont **les anciens** (table : plan/renumerotation.json).

# Chapitre 7 — Des enfants de 4 et 6 ans : levée des `[À VÉRIFIER]`

- **Passe du :** 24 septembre 2026
- **Fichier vérifié :** `chapitres/07-des-enfants-de-4-et-6-ans.md` (lu, pas modifié)
- **Bilan :** 7 drapeaux — **5 LEVÉS**, **1 CORRIGÉ**, **1 INTROUVABLE**

« LEVÉ » couvre aussi les drapeaux où le texte n'avait **pas** de valeur et où la source en
fournit une : la colonne « à faire » donne alors la valeur à insérer. Les numéros suivent l'ordre
des drapeaux dans le chapitre.

| # | Où | Verdict | Source | À faire |
| --- | --- | --- | --- | --- |
| 1 | §5-A, étape 2 « Poser les avertisseurs » : « Le bouton-test dit que la pile et la sirène fonctionnent ; il ne dit pas que la cellule voit encore la fumée ou le gaz [À VÉRIFIER]. » | **LEVÉ** — guide du fabricant d'un avertisseur combiné fumée et CO : « The alarm will sound if the electronic circuitry, horn, and battery are working. If the alarm does not sound, the unit must be replaced. » Le bouton éprouve le circuit, la sirène et la pile ; aucune des pages du fabricant ne dit qu'il éprouve la cellule | `sources/15b-kidde-avertisseur-co-bouton-et-temperature.md` (déjà au dossier ; la fiche dit elle-même qu'elle lève ce drapeau du ch. 7) | Retirer le drapeau : « Le bouton-test dit que la pile, le circuit et la sirène fonctionnent ; il ne dit pas que la cellule voit encore la fumée ou le gaz. » | ✔ appliqué
| 2 | §5-B, étape 9 « Désigner la pièce chaude » : « Cible de température pour une chambre d'enfant : [À VÉRIFIER] — voir ch. 3. » | **LEVÉ** — valeur fournie : pendant un froid extrême, **garder la pièce à 19 °C ou plus**. Consigne pour toute la maisonnée : aucune cible propre à une chambre d'enfant n'a été trouvée | `sources/07-quebec-froid-extreme-piece-19-c.md` (+ page `sources/07-quebec-preventing-harmful-effects-cold.html` ; même consigne déjà relevée dans `sources/11-quebec-froid-extreme.md`) | « Cible de la pièce chaude : **19 °C ou plus**, lus à la hauteur du lit des enfants. Repère qui se lit sans thermomètre : un enfant qui dort les bras sortis de la couverture est assez chaud ; un enfant qui dort en boule, tuque enfoncée, ne l'est pas. » (La phrase sur l'air stratifié reste telle quelle) | ✔ appliqué
| 3 | §6, tableau des points de contrôle, ligne « Chaque jour — Nombre de mictions et couleur de l'urine » : « Nombre-repère par 24 h : [À VÉRIFIER] » | **INTROUVABLE** — aucune source ne donne un nombre de mictions par 24 h pour un enfant de 4 ou 6 ans. La page québécoise donne, en revanche, **un seuil en heures** : « Absence d'urine […] pendant plus de huit heures chez les enfants plus âgés et les adultes » = déshydratation **sévère** ; « Diminution de la fréquence des urines » = légère ; « Urines peu fréquentes ou foncées » = modérée | `sources/29-quebec-signes-deshydratation.md` (déjà au dossier ; recoupé par `sources/05-quebec-signes-deshydratation.md`) | Remplacer le nombre par le seuil sourcé : « Mictions au rythme habituel de l'enfant, urine pâle. **Plus de 8 h sans uriner : déshydratation sévère** » ; colonne « si ça ne va pas » inchangée pour « moins que d'habitude ou urine foncée », et ajouter : « 8 h sans uriner : section 7 et 811 si la ligne fonctionne » | ✔ appliqué
| 4 | §6, tableau des points de contrôle, ligne « Chaque mois — Avertisseurs de CO et de fumée » : « Il vérifie la pile et la sirène, pas la cellule [À VÉRIFIER] » | **LEVÉ** — même source que la ligne 1 : circuit, sirène et pile ; « If the alarm does not sound, the unit must be replaced » confirme aussi la colonne « si ça ne va pas » | `sources/15b-kidde-avertisseur-co-bouton-et-temperature.md` | Retirer le drapeau : « Le bouton-test fait sonner. Il vérifie la pile, le circuit et la sirène, pas la cellule » | ✔ appliqué
| 5 | §8 DANGER, entrée « Thuya occidental » : « Il contient de la thuyone, un composé neurotoxique [À VÉRIFIER — source à établir au ch. 25]. » | **LEVÉ** — « Thujone has been regarded as a severe neurotoxicant » ; mécanisme établi chez l'animal (canal chlore commandé par le GABA) ; intoxication aiguë : **convulsions** ; l'humain est « at least as sensitive » que l'animal ; aucune donnée chez l'enfant, usage à réduire au minimum. La thuyone est le constituant principal de l'huile du thuya occidental | `sources/07-ema-thuyone-neurotoxique.md` (PDF `sources/31-ema-thuyone-declaration-publique-rev1.pdf`, déjà au dossier) ; lien thuya-thuyone : `sources/31-ema-thuja-occidentalis-thuyone.md` (déjà au dossier) ; convulsions chez le rat : `sources/25-ntp-thuyone.md` | Retirer le drapeau et donner le signe : « Il contient de la thuyone, un poison des nerfs qui donne des convulsions. » La suite (« Pour la vitamine C en tisane… ») reste | ✔ appliqué
| 6 | §9, « Sans jus d'orange non plus » : « il reste le sucre et le sel dissous dans l'eau bouillie refroidie. Le rapport exact est [À VÉRIFIER] et il ne s'improvise pas » | **LEVÉ** — valeur fournie : **½ cuillère à thé de sel et 6 cuillères à thé de sucre dans 1 L** d'eau potable (« the same solution » que le sachet). Le sel est le même que dans la recette québécoise au jus : 2,5 mL | `sources/29-oms-cholera-solution-rehydratation-maison.md` (déjà au dossier, conversion métrique faite dans la fiche) | « **Sans jus d'orange non plus**, il reste le sucre et le sel dissous dans l'eau bouillie refroidie : **2,5 mL de sel et 30 mL de sucre dans 1 L d'eau** — une demi-cuillère à thé et six cuillères à thé, à la cuillère à mesurer, arasées. Le rapport ne s'improvise pas ; la vérification de cuisine, elle, tient en une gorgée… » (suite inchangée) | ✔ appliqué
| 7 | §9, « Continuer à le faire manger » : « l'intestin absorbe encore pendant la gastro, et un enfant à jeun n'a plus le sucre qui fait passer l'eau [À VÉRIFIER]. » | **CORRIGÉ** — la consigne est confirmée (continuer à manger), mais **la source donne un autre mécanisme** : « le fait de manger aide la paroi de l'intestin à guérir rapidement » ; « Ne pas manger, au contraire, prolonge la diarrhée » ; cesser de manger « ne fournit pas assez de calories et peut retarder la guérison ». Chez l'enfant : reprendre l'alimentation « après quatre heures de réhydratation bien tolérée », en petites portions | `sources/07-quebec-salimenter-pendant-une-gastro.md` (+ `sources/07-quebec-salimenter-pendant-une-gastro.html`, `sources/07-quebec-hydrater-rehydrater-gastro-2026-09-24.html`) | « **Continuer à le faire manger.** Le réflexe de « laisser reposer l'estomac » est le mauvais : manger aide la paroi de l'intestin à guérir, et un enfant qu'on ne nourrit pas garde sa diarrhée plus longtemps, sans les calories qu'il lui faut. Dès que la solution passe bien depuis quatre heures, on reprend à manger en petites portions — pâtes, riz, viande maigre et poisson cuits sans gras, œufs, légumes cuits, pain — et on augmente avec l'appétit. » La suite (« Ce qu'on ne fait jamais… ») reste, voir la note B | ✔ appliqué

## Notes hors drapeau

**A — L'eau de riz.** Le §9 range « l'eau de riz » parmi ce qu'on ne donne jamais. La page de l'OMS
qui fournit la recette sucre-sel (ligne 6) dit qu'on peut la faire avec « 1 litre of safe
drinking-water or lightly salted rice water ». L'eau de riz seule n'est pas une solution de
réhydratation, et la phrase du chapitre reste vraie ; mais le chapitre 29 s'appuie sur la même page
de l'OMS, et les deux chapitres ne doivent pas se contredire. La page québécoise
(`sources/07-quebec-salimenter-pendant-une-gastro.md`) ne nomme pas l'eau de riz parmi les boissons
à éviter.

**B — La liste « ce qu'on ne fait jamais » (§9).** Jus seul, boissons gazeuses même dégazées,
boissons pour sportifs : confirmés mot pour mot par la page québécoise (jus de fruits qui
contiennent beaucoup de sucre, boissons pour sportifs de type Gatorade, boissons gazeuses même
dégazéifiées). La même page ajoute les bouillons et soupes en sachet ou en conserve.

**C — Le délai « deux à trois semaines » du mal de caribou (§8).** Non marqué ici, mais la
vérification du chapitre 12 (ligne 6) n'a trouvé aucune source pour ce délai. Même remarque qu'au
chapitre 26, note B.

**D — Le bouton-test (lignes 1 et 4).** La fiche Kidde est d'un seul fabricant ; elle nomme ce que le
bouton éprouve et ne dit nulle part qu'il éprouve la cellule. Si l'avertisseur de la maison ou du
chalet est d'une autre marque, sa notice se lit.
