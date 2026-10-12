export const meta = {
  name: 'plan-de-match-leger',
  description: 'Etapes peu couteuses du plan de match : calibres de JP et pointe de fleche, foene, fouille des planches oubliees, renvois vers les nouveaux chapitres, menage (credits, plan maitre, glossaire)',
  phases: [{ title: 'Travail', detail: 'cinq agents en parallele, fichiers separes' }],
}

const CTX = `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie en français québécois pour JP et sa famille (Côte-Nord). Projet : C:\\Users\\jeanp\\New folder. **CLAUDE.md est dans ton contexte et prime sur tout** : aucun chiffre inventé (la source d'abord, enregistrée dans sources/, provenance dans suivi/NN-redaction.md), aucune attribution de source dans le texte, ni loi, ni municipalité, ni relecteur, ni numéro de téléphone, ni service qui répond ; un signe nommé s'explique en note de bas de page ; une méthode ancestrale reste avec pourquoi elle marche et son avertissement. Français québécois, dense, pas de tutoiement du lecteur. Corrige avec Edit, sans réécrire ce qui n'est pas visé. Avant de modifier un fichier, copie-le dans \`C:\\Users\\jeanp\\AppData\\Local\\Temp\\claude\\C--Users-jeanp-New-folder\\bed7cfe7-8639-429a-8cfe-5f58e5149259\\scratchpad\\backup-plan-leger\\\`. **Ne touche qu'aux fichiers de ta mission** : quatre autres agents travaillent en même temps sur d'autres fichiers. Travaille économiquement : Grep, puis Read avec offset/limit.`

const S = { type: 'object', properties: { fait: { type: 'array', items: { type: 'string' } }, pourJP: { type: 'array', items: { type: 'string' } } }, required: ['fait', 'pourJP'] }

const MISSIONS = [
  { label: 'armes de JP et pointe de flèche', p: `${CTX}

**Ta mission : aligner le livre sur les armes que JP possède, et écrire la pointe de flèche.** Fichiers permis : \`chapitres/35b-les-armes-les-munitions-et-l-arc.md\`, \`chapitres/43b-chasser-le-petit-gibier.md\`, \`chapitres/36-abattage-saignee-evisceration.md\`, \`chapitres/00b-acheter-par-priorite.md\`, et leurs fiches \`suivi/\`.

1. **Les armes de JP** : un calibre 12, une .22, une 7 mm Remington Magnum, deux .308 Winchester, une .303 British. Aucune arme ne s'achète. Le ch. 35b compte les cartouches pour un hiver : refais ce compte **par calibre de JP** (le 12 et la .22 pour le petit gibier, la .308, la 7 mm Rem Mag et la .303 British pour l'orignal et l'ours), en partant des chiffres que le chapitre a déjà et de leurs sources. Dis ce qui compte vraiment : les deux .308 partagent une munition, donc le stock s'y concentre ; la .303 British est une cartouche à bourrelet, plus rare en magasin (vérifie à la source avant de l'écrire). Aucune donnée balistique sans source. Aligne le 43b (petit gibier : 12 et .22) et le 36 (s'il nomme un calibre ou un type d'arme pour l'orignal) sur ces calibres. Au 00b, les lignes de munitions nomment ces calibres ; aucune ligne d'arme.
2. **La pointe de flèche (ch. 35b §9)** pour plus gros que le petit gibier : taillée dans la tôle, un clou ou l'os, emmanchée et ligaturée au tendon. Cherche la source avant d'écrire (manuels de survie reconnus, ethnographie, fédérations d'archers). Dis franchement ses limites : l'Alaska exige 22,7 kg de force d'arc pour l'orignal (\`sources/35b-adfg-proposition-122-force-arc-orignal.md\`) ; un arc de fortune ne les garantit pas.`},
  { label: 'foène à poisson', p: `${CTX}

**Ta mission : la foène à poisson (le nigog des Mi'kmaq et des Innus).** Elle est absente du livre. Lis \`chapitres/53-truite-et-omble-au-lac.md\` et \`chapitres/56-nasses-filets-verveux.md\` aux passages pertinents (Grep « variante », « §9 », « sans filet »), choisis le chapitre où elle va le mieux (un seul), et écris-la dans sa section 9 (variante d'urgence) : de quoi elle est faite (trois dents, bois franc ou fer, la dent du milieu et les deux branches qui pincent), comment la fabriquer avec ce qu'on a au chalet, où et quand on s'en sert (au bord, en eau peu profonde, sous la glace par un trou, la nuit au flambeau si la source le dit), et comment on vise dans l'eau (la réfraction : si la source la décrit). Sources d'abord : ethnographie (Turner 1894 est dans \`sources/autochtones/\`), musées, ministères, documents mi'kmaq ou innus publiés. C'est une méthode ancestrale : dis pourquoi elle marche et l'avertissement qui s'applique. Si elle se prête à une planche, décris-la dans ta réponse (pourJP), sans la dessiner.`},
  { label: 'fouille des planches oubliées', p: `${CTX}

**Ta mission : trouver les planches VRAIMENT utiles qui ont été laissées de côté.** Tu ne dessines rien et tu ne modifies aucun chapitre. Tu écris un seul fichier : \`images/fouille-planches-oubliees.md\`.

Le critère de JP : une planche pour ce qu'on **fabrique, bâtit ou fait de ses mains**, qui sert à survivre, et que le texte seul n'arrive pas à montrer. Une construction se dessine en profondeur (plusieurs vues). Pas de planche pour une règle, une donnée, ce qui s'achète, ni ce qui est déjà validé. L'exemple qui a lancé la fouille : l'arc et la flèche du ch. 35b §9, décrits en 3 000 mots et jamais dessinés.

Pars de ce qui existe, sans relire tout le livre : \`images/idees-planches-nouvelles.md\` (262 idées), \`suivi/notes-planches-pour-chapitres.md\`, \`images/plan-planches.md\`, et les planches demandées par les 12 chapitres nouveaux (cherche « planche » dans \`suivi/14b-redaction.md\`, \`15b\`, \`16c\`, \`18b\`, \`20b\`, \`20c\`, \`27b\`, \`35b\`, \`35c\`, \`35d\`, \`43b\`, \`89b\`). Écarte tout ce qui a déjà un PNG dans \`images/validees/\` (compare par numéro et par sujet). Vérifie au besoin, par Grep, que le chapitre décrit bien la fabrication.

Le fichier : une liste de **25 planches au plus**, classées de la plus utile à la moins utile, une ligne chacune : numéro proposé, sujet, chapitre, pourquoi c'est vital (en une phrase), profondeur (une page, ou deux pages en plusieurs vues), coût estimé (≈ 150 à 200 k par page). Puis, en quelques lignes, ce que tu as écarté et pourquoi. JP choisira dans cette liste avant qu'on dessine quoi que ce soit.`},
  { label: 'renvois vers les nouveaux chapitres', p: `${CTX}

**Ta mission : faire pointer les vieux chapitres vers les 12 chapitres nouveaux**, là où le lecteur en a besoin. Fichiers permis : \`chapitres/14-sans-propane.md\`, \`16-le-feu-au-chalet.md\`, \`20-se-deplacer-et-le-carburant.md\`, \`35-lire-le-territoire-autour-du.md\`, \`44-lievre-d-amerique.md\`, \`45-gelinotte-huppee-et-tetras-du.md\`, \`46-castor.md\`, \`47-porc-epic.md\`, \`48-ours-noir.md\`, \`49-rat-musque-ecureuil-roux.md\`, \`50-outarde-canards-oiseaux-d-eau.md\`, \`60-seve-gomme-ecorces.md\`, \`69-un-congelateur-plein-qui.md\` (et leurs fiches suivi/).

Les renvois à poser : 14 → 14b (le pain) ; 16 → 16c (la tente d'hiver, l'abri de repli) ; 20 → 20b (raquettes et toboggan) et 20c (le canot) ; 35 → 35c (traces et signes) et 35d (pister, retracer) ; 44 à 50 → 43b (chasser le petit gibier) et 35d (retracer une bête blessée), chacun là où il parle de trouver ou de tirer la bête ; 45 §9 → 35b (« la cartouche ne se remplace pas » : la suite est au 35b) ; 69 → 18b (l'électricité du chalet, ce que le congélateur consomme) ; 60 (gomme d'épinette, récolte par bande d'écorce, essai de la languette) → 20c, qui fait maintenant la règle : aligne l'étape 32 du 60 (« ne jamais entailler un conifère sain ») sur la méthode ancestrale du 20c, avec son avertissement, et renvoie au 20c pour l'essai.

**Avant chaque renvoi, lis le passage visé du chapitre nouveau** pour que le renvoi dise vrai (section ou étape exacte). Un renvoi court, dans la phrase : « (ch. 20b) », « la suite est au ch. 43b ». N'ajoute pas de renvoi là où il n'aide pas.`},
  { label: 'ménage : crédits, plan maître, glossaire', p: `${CTX}

**Ta mission : le ménage des fichiers de référence.** Tu ne touches à aucun chapitre. Fichiers permis : \`images/credits.md\`, \`plan/plan-maitre.md\`, \`suivi/suivi-chapitres.md\`, \`plan/glossaire.md\`, \`plan/budget-pages.md\`.

1. **Crédits** : regroupe dans \`images/credits.md\` les registres \`images/photos/registre-*.md\` (auteur, licence, lien, fichier), au format qui existe déjà dans credits.md, classés par chapitre. Ne retire aucune ligne existante. Les trois figures de revues sous CC BY du ch. 41 sont maintenant acceptées (règle ajoutée à CLAUDE.md le 24 septembre).
2. **Plan maître et suivi** : inscris les 12 chapitres nouveaux (14b, 15b, 16c, 18b, 20b, 20c, 27b, 35b, 35c, 35d, 43b, 89b) à leur place dans \`plan/plan-maitre.md\` et \`suivi/suivi-chapitres.md\`, au format des autres (titre, tome, lieu, statut : écrit, vérifié, corrigé, [À VÉRIFIER] levés, à lire par JP). Ajoute aussi, marqués « à écrire », les six chapitres prévus pour le tome 2 (voir \`suivi/plan-de-match.md\`, point 1).
3. **Glossaire** : ajoute ce que les chapitres nouveaux ont signalé (cherche « glossaire » dans leurs fiches \`suivi/NN-redaction.md\`) : noms latins tranchés, termes de pistage (empreinte, piste, trace, foulée…), grand corbeau, mésangeai du Canada. Ne tranche pas un nom latin contesté : note-le « à trancher » avec les deux noms.
4. **Budget de pages** : mets à jour \`plan/budget-pages.md\` avec les mots réels des 104 chapitres (wc -w) à environ 700 mots par page, les planches validées (\`images/validees/\`) et les photos par chapitre, tome par tome ; signale le tome qui déborde de 440 pages et celui qui a de la place.`},
]

return await parallel(MISSIONS.map(m => () =>
  agent(m.p, { label: m.label, phase: 'Travail', schema: S }).then(r => ({ mission: m.label, ...r })).catch(e => ({ mission: m.label, erreur: String(e) }))
))
