# Le lecteur de relecture

Les six tomes page par page, à lire sur l'iPad et à annoter à l'Apple Pencil. Les notes de JP vont dans
la base de données de l'Artifact ; Claude les relit et les applique.

- **Le lecteur :** https://claude.ai/artifact/DCD4NbpnXUtWVWZrcw7F35 (privé, à JP)
- **Édition des pages en ligne :** 2026-10-14 (les intérieurs assemblés ce jour-là)

## Monter ou remettre les pages

1. `python3 design/outils/assembler-tome.py N --hors-ligne` pour chaque tome à refaire.
2. `design/outils/relecture/rendre.sh 1 2 3 4 5 6` : pages à 1100 px de large, rognées au format fini,
   en feuilles WebP de 5 pages (`livre/relecture/site/pages/tN/kkk.webp`, page p = feuille (p-1)//5,
   rang (p-1)%5). Le texte et le trait passent en 48 couleurs sans perte ; les feuilles avec photo, en
   WebP avec perte. Environ 150 Mo pour les six tomes.
3. `python3 design/outils/relecture/monter.py 1,2,3,4,5,6 AAAA-MM-JJ` : l'index, avec la date d'édition.
4. Publier `livre/relecture/site/index.html` sur l'URL ci-dessus, `root` = `livre/relecture/site`, les
   feuilles dans `files`. Un envoi : 64 Mo et 255 fichiers au plus, donc trois lots (tomes 1-2, 3-4, 5-6).
   Une version garde au plus 511 fichiers et 256 Mo.

## Lire les notes de JP

1. ArtifactData `list`, collection `annotations`, `out_dir` = `livre/relecture/db`.
2. `python3 design/outils/relecture/notes-sur-pages.py [--tome N]` : une image par page annotée dans
   `livre/relecture/notes/`, les traits posés sur la page et la note écrite dessous, plus `index.md`.
   Il faut les feuilles de **l'édition où JP a écrit** (champ `e` de chaque trait) : si le livre a bougé
   depuis, refaire les pages de cette édition-là avant de lire, sinon les traits tombent à côté.
3. Appliquer dans les chapitres ou les planches.
4. Marquer ce qui est fait : pour chaque document, `f: true` sur les traits appliqués et
   `noteFaite: true` si la note l'est (ArtifactData `set` avec `if_version`). La page passe au vert
   dans le lecteur.

## Le document d'une page annotée

`annotations/t{tome}-p{page:03d}` :
`{tome, page, note, noteFaite, maj, traits: [{i, o: "s"|"h", c, w, p, e, f?}]}`.
`o` : stylo (`s`) ou surligneur (`h`) ; `c` : couleur ; `w` : largeur ; `p` : points `x,y` séparés par
des espaces, en dixièmes d'unité d'une page large de 1000 et haute de 1250 (le format fini 8 × 10 po) ;
`e` : l'édition des pages ; `f` : déjà appliqué.
