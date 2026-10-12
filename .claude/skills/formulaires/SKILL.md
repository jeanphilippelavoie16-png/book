---
name: formulaires
description: Composer les formulaires vierges du Grand Livre du Chalet — fiches de relevé, registres, carnets, étiquettes à découper — en PDF 8 × 10 po typographié en Georgia, prêts à imprimer et à remplir au crayon. Utilise ce skill dès qu'un chapitre demande une feuille à remplir, un registre, une fiche, un carnet de suivi ou une étiquette, et dès qu'une « planche » est en réalité un formulaire. Un formulaire n'est jamais une planche : pas de dessin, pas de renvoi numéroté.
---

# Composer un formulaire

Un formulaire n'est pas un dessin. C'est une feuille qu'on imprime, qu'on scotche sur une
porte de congélateur, et qu'on remplit au crayon à deux heures du matin, avec un enfant
qui pleure à côté. Il doit se comprendre sans mode d'emploi.

**Il s'explique par ses en-têtes, et par rien d'autre.** Pas de renvois numérotés ①②③
qui pointent les cases, pas de crayon dessiné dans un coin, pas d'encadré décoratif. La
première version de la fiche des quatre horloges avait tout ça, et JP l'a trouvée pas
professionnelle — avec raison : personne ne numérote les parties d'une feuille de relevé.

## La méthode

1. **Lis le chapitre**, là où il dit quoi noter. Chaque champ du formulaire vient d'une
   phrase du chapitre — « noter l'heure et l'écrire », « compter les têtes à voix haute »,
   « la température de la pièce, chaque heure ». Un champ qui ne vient pas du chapitre
   n'a rien à faire sur la feuille.
2. **Écris la description** en JSON dans `images/formulaires/NN-NN.json`. Le format et
   les types de blocs sont en tête de `scripts/composer-formulaire.js`.
3. **Compose** :
   ```bash
   node .claude/skills/formulaires/scripts/composer-formulaire.js images/formulaires/NN-NN.json
   ```
   Sortent : le PDF à imprimer, et un aperçu PNG.
4. **Regarde l'aperçu** avec l'outil de lecture d'images. Toujours. C'est ce qui a attrapé
   la consigne qui laissait un mot seul sur sa ligne, la rangée d'en-têtes inégale, et le
   pouce vide en bas de page.
5. **Vérifie qu'il tient sur une page** — le script le dit en comptant les pages du PDF.
   Un formulaire de relevé tient sur une feuille.
6. Corrige, recompose, regarde. Jusqu'à ce que tu n'aies plus rien à reprocher.

## Ce qui fait un formulaire professionnel

**Une seule mise en page pour tout le livre.** C'est le script qui la porte, et on ne la
contourne pas : la cohérence entre les formulaires est ce qui les fait paraître faits par
la même main. Si un formulaire a besoin de quelque chose que le script ne sait pas faire,
on ajoute un type de bloc au script — on ne bricole pas un HTML à part.

**Des lignes faites pour la main.** 7,6 mm par ligne de tableau : c'est ce qu'il faut à une
écriture normale au crayon. Plus serré, les chiffres débordent sur la ligne du dessus.
Un filet un peu plus appuyé toutes les cinq lignes, pour qu'on se repère en remplissant.

**Des en-têtes qui disent quoi écrire, avec l'unité et la cible.** « Pièce — °C · 18 à 24 »
dit à la fois ce qu'on mesure, en quoi, et ce qui est normal. C'est la seule donnée qu'un
formulaire porte, et elle est là parce qu'elle sert au moment d'écrire.

**Une rangée d'en-têtes égale.** Tous sur deux lignes au plus, centrés à la même hauteur.
Si un en-tête fait trois lignes, raccourcis son sous-titre.

**La page remplie.** Un pouce vide en bas d'une feuille de relevé, c'est trois lignes de
relevé perdues. Ajuste le nombre de lignes du tableau jusqu'à la dernière qui tient.

**Une ligne de rappel au plus, et seulement si elle s'applique à ce qu'on fait en
remplissant.** La fiche de panne porte la génératrice, parce qu'on la remplit pendant une
panne. Un registre de stock n'en porte pas.

## Ce qu'on ne met jamais

- Des renvois numérotés, des flèches, un dessin.
- Des exemples pré-remplis. Une case remplie donne envie de la laisser telle quelle. Si un
  exemple est vraiment nécessaire, une seule ligne, en italique gris, clairement à part.
- Une attribution de source. Le pied de page dit « Le Grand Livre du Chalet » et le numéro
  de fiche, rien d'autre.
- Du remplissage pour faire sérieux : un champ « signature », un champ « vérifié par ».
  Personne ne signe sa fiche de panne.
