---
name: lecteur-relecture
description: "Le lecteur iPad des six tomes où JP annote à l'Apple Pencil ; ses notes sont dans la base de l'Artifact, à lire avec ArtifactData"
metadata:
  node_type: memory
  type: project
  modified: 2026-10-14T23:20:00.000Z
---

Le 14 octobre 2026, JP a demandé « un affaire que je peux lire le tome et l'annoter pour faire des modifs »,
avec l'Apple Pencil, pour un tome ou pour tous. Fait : https://claude.ai/artifact/DCD4NbpnXUtWVWZrcw7F35,
les six tomes (édition du 14 octobre), une base `annotations` avec un document par page annotée.

**Why:** il relit le livre imprimable sur l'iPad et veut que ses corrections au crayon reviennent à Claude
sans exporter de PDF annoté (le PDF de 66 Mo ne passait pas en pièce jointe).

**How to apply:** quand JP dit « applique mes notes » (d'un tome ou de tous), suivre
`design/outils/relecture/LISEZMOI.md` : télécharger la base, poser les traits sur les pages avec
`notes-sur-pages.py`, regarder les images, appliquer, puis marquer `f: true` / `noteFaite: true`. Après
des changements qui déplacent des pages, refaire et republier les pages du lecteur avec une nouvelle date
d'édition.
