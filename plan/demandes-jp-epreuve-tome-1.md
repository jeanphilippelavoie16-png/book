# Les demandes de JP sur l'épreuve papier du tome 1 (27 et 28 octobre 2026)

JP a lu l'épreuve du tome 1 (70 $ chez Lulu) et a pointé ce qui n'allait pas, page par page. Il a demandé de regarder
chaque demande, de l'analyser et de porter un correctif au livre. Pour chacune : ses mots, pourquoi c'est arrivé, ce
qui change dans les règles (pour que ça ne revienne pas) et dans les pages, et ce qui reste.

| # | Ce que JP a dit | Pourquoi c'est arrivé | Le correctif dans les règles | Les pages corrigées | Ce qui reste |
| --- | --- | --- | --- | --- | --- |
| 1 | « Sache où sait?? » ; « Faut pu jamais que ça arrive une faute de même » (la dédicace, page 2) | Personne ne relisait la langue : la chaîne vérifiait les faits et le style, pas les fautes. Le subjonctif d'une relative (« quelqu'un qui sache ») échappe à LanguageTool | Skill `langue` et `langue.py` (LanguageTool et nos règles) ; un correcteur dans la chaîne, après l'éditeur ; l'assembleur relit tout ce qu'il imprime (section Langue du rapport) | Dédicace ; note du sommaire (« neuf sections ») ; trois espaces insécables | Le correcteur sur les 18 chapitres du tome 1 (580 avis à juger au départ) |
| 2 | « Le texte dans les livres, c'est pas étiré pour que ça soit égal ? » | Les normes graphiques disaient « justifiée », le gabarit ne l'appliquait pas | Texte courant justifié, césure fr-CA (gabarit et pages des dangers) ; ligne du cadre | Tout le livre au prochain montage | Rien |
| 3 | « (Pictogramme du monoxyde) c'est tu normal ? » | Un renvoi écrit en toutes lettres en attendant le pictogramme, jamais remplacé | `{>id}` : le pictogramme, le nom et la page du danger | Les 17 renvois des pages des dangers | Rien |
| 4 | « Et où 2 fois de suite » | Aucune règle sur deux « ou » l'un dans l'autre | Skill `langue`, section 10 ; règle `ou-repete` dans `langue.py` | 53 phrases du tome 1 et des pages des dangers ; 3 au ch. 26 | 83 dans les tomes 2 à 6, au correcteur de chaque refonte |
| 5 | « La tournure de phrase du paragraphe on est tenté… est fucking weird » | Un détour par la tentation, une liste qui mélange des moments et des raisons | Skill `ecriture`, règle 12 | Le paragraphe | Voir le 12 |
| 6 | « Le chapitre sur quoi acheter je veux pu ça c'est pas dans l'âme du livre » | Le 00b, une liste d'achat en quatre paliers, n'est pas le sujet du livre | CLAUDE.md : le livre n'a pas de liste d'achat ; chaque chapitre dit ce que sa procédure demande | 00b retiré ; 48 renvois dans 30 chapitres ; le ch. 5 reprend ses chiffres ; dos du tome 1 | La partie débrouille du 00b (« Ce qui remplace ce qu'on n'a pas acheté ») à comparer aux variantes d'urgence (question à JP) |
| 7 | « Le courant manque et on ne sait pas quand il reviendra… la façon que t'écris c'est pas humain » | Des phrases qui décrivent au lieu de nommer, des verbes qui sonnent faux | Skill `ecriture`, règle 13 ; gabarit (« Quand l'utiliser » en titres de situation) | Section 2 des 18 chapitres du tome 1 et du ch. 26 ; « le courant manque » aux ch. 6 et 7 | Les tomes 2 à 6 à leur refonte |
| 8 | « Les quatre horloges, on sait même pas c'est quoi ; faut l'expliquer » | La notion venait à l'étape 16, trois pages après le titre | Skill `ecriture`, règle 14 | Section 1 du ch. 1 | Les autres notions du livre (la bascule, la tournée…) à vérifier à la passe |
| 9 | « Ça c'est dans panne électricité qu'on devrait le savoir, les chapitres doivent parler de ce qu'ils parlent pas des autres » | Le ch. 1 refaisait le ch. 3 | CLAUDE.md, « Le gabarit » ; cadre | Ch. 1 réduit aux quatre horloges (4 pages) ; ce qui manquait au ch. 3 y est passé ; planche 01-02 devenue 03-13 ; la note des Innus au ch. 72 | Chercher les autres chapitres qui se recoupent (ch. 6, 8 et 9 ; ch. 25 et 26) |
| 10 | « Point de contrôle faut que ça soit condensé, personne va lire 50 points de contrôle » ; « même affaire pour les signes d'échec » | Le gabarit ne fixait pas de limite ; les tableaux redisaient les étapes | 5 à 8 lignes chacun (gabarit, CLAUDE.md, cadre, skill `editeur`) | Ch. 1 (8 et 8) ; ch. 3 (16 → 7 et 15 → 6) | Les 16 autres chapitres du tome 1, puis les tomes 2 à 6 |
| 11 | « Les pages danger on passe trop de temps à tourner autour du pot… minimum 2 dangers par page, pi les condenser » | Une page par danger (règle du 18 octobre) ; 400 à 700 mots par danger | Deux dangers par page dans l'assembleur, avertissement si un texte ne tient pas ; 150 à 230 mots ; plus de « Où il revient » | Les 36 pages des dangers condensées par agents, vérifiées (65 faits perdus ou changés remis), relues | Huit dangers de la partie 1 dépassent un peu 230 mots (jusqu'à 274) ; ils tiennent dans leur demi-page |
| 12 | Le skill d'éditeur (/polir, /diagnostiquer, /sublimer) | Pas de passe d'éditeur outillée | Skill `editeur` dans la chaîne, adapté au livre | Le ch. 3, refait au complet par la chaîne éditeur, vérificateur et finition | Les autres chapitres |
| 13 | « Non mais je veux dire un paragraphe de même ça veut rien dire » | J'avais poli le paragraphe du n° 5 au lieu de le couper | Skills `ecriture` et `editeur`, cadre : avant de polir, se demander si le passage doit exister | Le paragraphe est coupé de la page de la génératrice | Rien |

## La leçon commune

Toutes ces fautes sont du même genre : ce que JP a trouvé à l'œil, une relecture qui posait la bonne question l'aurait
trouvé avant l'impression. La question, à chaque passage : **est-ce qu'il doit exister, est-ce qu'il est à sa place,
est-ce qu'il se dit comme ça à voix haute, est-ce qu'il est juste en français ?** C'est maintenant l'ordre de la
chaîne : l'éditeur (skill `editeur`) juge l'existence et la place, l'écriture (skill `ecriture`) la phrase, le
correcteur (skill `langue`) la langue, et l'assembleur relit tout ce qui s'imprime.

## Avant la prochaine épreuve du tome 1

1. La même passe que le ch. 3 sur les 16 autres chapitres du tome 1 (éditeur, vérificateur, finition), avec les
   tableaux à 8 lignes.
2. Le montage complet du tome 1 ; la section Langue du rapport à 0 avis ; les couvertures et l'épaisseur du dos
   refaites.
3. JP regarde les pages avant de payer l'épreuve.
