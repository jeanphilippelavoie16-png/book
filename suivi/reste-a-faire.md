# Ce qui reste à faire (18 octobre 2026)

Le plan d'ensemble, dans l'ordre où ça se fait. Le détail de chaque point est dans `suivi/plan-de-match.md`
(section « PAUSE du 15 octobre », points 1 à 30) ; ce fichier dit l'ordre et ce qui dépend de quoi. Tout agent
lancé sur un de ces chantiers reçoit `.claude/cadre-agents.md` au complet.

## Fait cette semaine (16 au 18 octobre)

- Les règles de JP entrées dans le cadre des agents, le skill `ecriture` et ses scripts de contrôle.
- Le gabarit à huit sections ; l'encadré orange détaillé ; les symboles de repère ; les deux pages « Comment le
  livre fonctionne » ; le bandeau de titre des planches ; les trois tailles de planche dans le moteur.
- Les chapitres modèles 3 et 13 refaits avec les règles.
- **Les mains** : le fichier Adobe Stock 116570613 de JP converti et branché dans le moteur
  (`h.formes.mainStock`, 100 mains, dont une trentaine qui tiennent un objet ; feuille des numéros
  `livre/apercus-palette/mains-stock-ids.png`).
- **L'image du tome 1** : générée, choisie par JP, vectorisée, posée sur la page de titre.

## 0. Les dangers en pictogrammes (point 31)

Tome 1 seulement pour l'instant ; les tomes 2 à 6 ensuite (JP, 18 octobre). D'abord les 36 pictogrammes et un
chapitre test (le ch. 10) montrés à JP ; puis les pages des dangers du tome 1 et la migration de ses chapitres.
À la migration des tomes 2 à 6 : aligner le ch. 35c (et ses renvois) sur l'ours noir en deux cas, décidé par JP le
18 octobre ; corriger les chiffres tranchés à la source dans `suivi/dangers-redaction.md` (génératrice 6 m au ch. 5 ;
glace aux ch. 39, 41, 50, 73 ; botulisme aux ch. 5, 35, 54, 68, 80, 91 ; vitamine A au ch. 56 ; huile à l'ail aux
ch. 78, 92 ; poisson fumé au ch. 35 ; moules au ch. 59 ; hantavirus au ch. 79).

## 1. Les passes mécaniques sur le texte (par script, avant tout le reste)

Elles touchent les 113 chapitres et doivent passer avant les réécritures, qui touchent le même texte.

| Passe | Volume | Point |
| --- | --- | --- |
| « § » devient « section » | 1 599 signes, 109 chapitres, 43 logigrammes | 1 |
| Migration à huit sections (« Comment ça marche » sort, le Matériel devient la section 3) et renumérotation des renvois | environ 2 300 renvois | 21 |
| La note de lieu sous le titre sort | 37 chapitres | 8 |
| La liste « mauvaise procédure » de la section 2 sort | 56 chapitres | 4 |

## 2. Les passes de phrase (agents, chapitre par chapitre, avec `controle.py`)

| Passe | Volume | Point |
| --- | --- | --- |
| La consigne au pronominal (« il se jette » devient « le jeter ») | environ 3 000 cas | 16 |
| La chose qui pense (« la braise ne sait pas ») | 97 cas | 28 |
| Les lois en formule, les paraboles, les maximes | à repérer par le script | 6, 11, 20 |
| Les mots que personne n'emploie (« carter », « seuil », « un change ») | à repérer | 5, 15 |
| Les procédures tassées dans une étape se découpent en sous-étapes, avec leurs repères | à repérer | 13 |
| La série orange devient l'encadré détaillé, tout dedans, sans partie « le détail » | les chapitres à série orange | 22 |
| La répétition, cherchée par idée | tous | 7 |

## 3. Le contenu à écrire ou à sourcer

- **Ch. 3 en deux** : la panne d'électricité l'hiver (03) et l'été (03b) (point 9).
- **Ch. 16 à l'année** : la sortie d'un blessé l'été (canot, VTT, travois), à sourcer, puis son logigramme (point 2).
- **Le siphon** : la trappe de vidange (le bouchon qui se dévisse), et la variante à l'huile marquée comme une autre
  façon (point 14).
- **Les sources qui manquent** : la génératrice « 1 h toutes les 8 h » ; le mécanisme du message texte qui passe
  quand l'appel ne passe pas (points 12 et 15).
- **Les renvois** des ch. 8 et 84 vers les étapes du ch. 3 ; le fil de l'électroscope et l'iode après 40 ans au
  ch. 4 (pause, point 3).

## 4. La refonte du tome 1, puis des tomes 2 à 6

Chaque chapitre refait au modèle des ch. 3, 11 et 13, contre la liste du cadre (pause, points 2 et 3 ; samedi,
point 3). Le tome 1 d'abord, remonté et relu par JP ; puis un tome à la fois.

## 5. Les planches

1. **Refaire les planches qui ont des mains avec `mainStock`** : 68 planches (inventaire
   `.claude/skills/planches/scripts/mains/inventaire.md`), dont 13-40 (depuis zéro) et 13-11 (points 23 et 29).
2. **Les planches manquantes et les 14 à refaire** (pause, point 1 ; liste dans `images/audit-planches/`), avec les
   corrections déjà demandées (04-42, 05-01, 07-01, 43-04, 77-01, 70-13).
3. **Le rouge expliqué** sur chaque planche, et les autres façons marquées (points 18 et règle 10).
4. **Les petites planches** : 46 candidates, puis la passe de fouille pour en trouver d'autres (points 25 et 26).
5. Chaque planche passe le second regard, puis va dans `images/a-valider/` pour JP.

## 6. Les images des tomes et les couvertures

- Tomes 2 à 6 : générer quelques images par tome (le texte de chacun est dans
  `images/tomes/brief-images-tomes.md`), JP choisit, on vectorise, on pose (point 30).
- La couverture de chaque tome, avec son image.

## 7. Le montage et l'épreuve

- Remonter les six tomes ; vérifier à l'image chaque page : planche près de son appel, aucun début de section en
  bas de page, aucune colonne trouée (points 17 et 24).
- Surveiller le tome 5 : 438 pages sur 440.
- La passe finale sur 100 % des planches, puis l'épreuve papier d'un tome chez Blurb.

## Ce qui attend une décision de JP

- Les images des tomes 2 à 6 et des couvertures : le choix, une fois générées.
- Les licences : Adobe Stock (noté comme licence standard à son nom), Shutterstock 2244726515 et Vecteezy 85069906
  (gardés mais plus utilisés).
