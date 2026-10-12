---
name: plan-de-match
description: "6 tomes, 114 chapitres (2e renumérotation le 27 sept. 2026) ; EN PAUSE le 27 sept. au soir — la marche à suivre pour reprendre est en tête de suivi/plan-de-match.md"
metadata:
  node_type: memory
  type: project
  originSessionId: bed7cfe7-8639-429a-8cfe-5f58e5149259
  modified: 2026-09-27T21:37:17.308Z
---

Six tomes, 114 chapitres : 1 Tenir (00, 00b, 1–18), 2 Le corps (19–40), 3 Prélever (41–60), 4 De la bête au garde-manger (61–81), 5 La forêt, le jardin et le chalet (82–101 ; agriculture 96–99), 6 L'atelier (102–112). Deux renumérotations (24 et 27 septembre 2026) : table cumulée `plan/renumerotation.json`. Les vieilles fiches `suivi/`, `sources/` et les photos citent les **anciens** numéros. Design : variante C ; tome 5 écorce, tome 6 **fonte** (choix de JP, 27 sept.).

**Le 27 septembre au soir, tout a été mis en pause** parce que JP manquait de jetons. La section « ⏸ PAUSE … COMMENT REPRENDRE » en tête de `suivi/plan-de-match.md` dit quoi relancer et dans quel ordre : 22 planches (`.claude/planches-reste.workflow.js` + `scratchpad/args-reste-2.json`), les photos manquantes (`resumeFromRunId wf_7fa3183a-c91`), puis `.claude/mise-en-pages-2.workflow.js` (jamais lancé), puis la passe finale sur 100 % des planches.

**Why:** JP surveille son budget de jetons (« je vais manquer de token, organise les agents pour rien perdre ») ; il veut pouvoir dire « reprends » et que ça reparte sans rien refaire.

**How to apply:** Quand JP dit « reprends », suivre la section PAUSE du plan de match. Donner le coût avant de lancer. Le scratchpad est lié à la session bed7cfe7… : dans une autre session, les fiches et args y sont encore sur le disque au même chemin. Voir [[planches-sans-relecture]], [[materiel-et-pourquoi-compresses]], [[toujours-montrer-pour-validation]], [[armes-de-jp]].
