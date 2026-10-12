export const meta = {
  name: 'edition-ensemble',
  description: 'Passe d edition sur l ensemble des 89 chapitres : coherence, glossaire, budget de pages, et les 3 fichiers de /plan manquants',
  phases: [
    { title: 'Edition', detail: 'sept agents, chacun sur une dimension de tout le corpus' },
  ],
}

const COMMUN = `Tu travailles sur "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte : il prime sur tout le reste.

Etat du projet : les 89 chapitres sont REDIGES (statut RED). Ils sont dans chapitres/NN-titre-court.md.
Chaque chapitre a une fiche dans suivi/NN-redaction.md qui recense ses chiffres [A VERIFIER], ses images, ses renvois et son relecteur.
Les pages sources sont enregistrees dans sources/ (845 fichiers). Le gabarit est dans gabarit-chapitre.md. Les prompts des roles sont dans roles.md.
Un bilan de la redaction est dans suivi/bilan-redaction.md. Le registre des images est dans images/credits.md.

IMPORTANT — methode de lecture : 478 000 mots, tu ne peux pas tout lire. Utilise Grep et Glob pour cibler,
lis les fiches suivi/NN-redaction.md qui sont courtes et denses, et ne lis integralement que les chapitres
que ton analyse designe. Travaille par echantillonnage raisonne, pas par lecture lineaire.

DEJA VERIFIE — ne le refais pas : la coherence des trois regles de securite repetees a ete controlee sur les
89 chapitres. La cuisson du gibier a 74 °C est uniforme (les 71 °C rencontres sont les chapitres qui NOMMENT
l'ecart ACIA/MAPAQ et retiennent 74 °C ; 70 °C est le poisson, 82 °C le gibier a plumes entier, 71 °C le boeuf
et le porc). Le botulisme de type E a 3 °C est uniforme. La regle du cadmium (jamais le foie ni les reins de
cervides) est citee dans 50 chapitres sans contradiction. Seule exception connue : le chapitre 67 (pemmican)
fonde son etape letale sur 71 °C / 15 s, barème ACIA des viandes fermentees et sechees, et s'est signale lui-meme.

Tu ne reecris AUCUN chapitre. Tu produis un document.`

const TACHES = [
  {
    id: 'glossaire',
    label: 'glossaire',
    out: 'plan/glossaire.md',
    prompt: `Construis le GLOSSAIRE du livre, dans plan/glossaire.md. Ce fichier manque et il bloque le role 5.

Il ne s'invente pas : il se RELEVE dans les 89 chapitres. Ta mission est de trouver le vocabulaire
reellement employe, puis de trancher quand deux mots designent la meme chose.

1. Releve les termes techniques recurrents : coupes de viande, procedes de conservation, materiel,
   parties de carcasse, unites, termes de salaison et de fumage, termes forestiers et fauniques.
2. Pour CHAQUE terme : une definition d'une a trois lignes, ecrite pour quelqu'un qui ouvre le livre a
   cette page, et la liste des chapitres ou il apparait.
3. TERMES CONCURRENTS — c'est le coeur du travail. Quand deux mots designent la meme chose dans deux
   chapitres differents, dis-le, donne les deux, donne les chapitres, et RECOMMANDE lequel garder avec
   la raison. Exemples a chercher : saumure / marinade / salaison humide ; longe / filet / contre-filet ;
   babiche / lanière / raquette ; caveau / cave / chambre froide ; poele / truie ; collet / piege.
4. Nom francais d'usage et nom latin pour chaque espece nommee dans le livre, avec les chapitres.
5. Signale les termes employes UNE SEULE FOIS dans tout le livre : soit c'est du jargon a remplacer,
   soit c'est une notion qui manque ailleurs.

Le glossaire est classe alphabetiquement. Il porte en tete le nombre de termes et la date de relevé.
Ecris aussi, en fin de fichier, la liste des arbitrages que tu recommandes a l'editeur, en une ligne chacun.`,
  },
  {
    id: 'redites',
    label: 'redites et recoupements',
    out: 'suivi/edition-redites.md',
    prompt: `Trouve les REDITES entre chapitres et propose les renvois qui les remplacent. Ecris dans suivi/edition-redites.md.

C'est le defaut structurel connu de ce corpus : 89 redacteurs ont travaille en parallele, aveugles les uns
aux autres. Le role 5 dit qu'un recoupement devient un renvoi.

Zones a examiner en priorite, parce que les sujets s'y chevauchent par construction :
- 61 a 69 (pourquoi la viande pourrit, sel, salaison, saumure, fumage, pemmican, froid) contre 70 a 73 (poisson)
- 24, 25, 26 (mal de caribou, scorbut, besoins d'hiver) contre 67 (pemmican et graisses) et 8 (stock)
- 8, 9, 10, 11, 12 (stock, 72 heures, preavis, listes, ce qui manque) entre eux — cinq chapitres de listes
- 13 (eau) contre 28 (hygiene et eaux usees) et 46 (castor, giardia)
- 36 a 42 (debitage) entre eux et contre 37 (carte de la carcasse)
- 57, 58, 59, 60 (petits fruits, plantes, champignons, seve) contre 30 (plantes medicinales) et 25 (scorbut)
- 82, 83, 84, 88 (affutage, scie, soudure, trempe) entre eux
- 14, 15, 16, 17, 18 (propane, poele, feu, allumettes, eclairage) entre eux

Pour CHAQUE recoupement trouve : les chapitres concernes, ce qui est dit deux fois, lequel doit GARDER le
contenu et pourquoi, et la formulation exacte du renvoi a mettre dans l'autre.

Distingue deux cas et ne les confonds pas :
- La REDITE a supprimer : le meme contenu technique developpe deux fois.
- Le RAPPEL VOULU : les regles de securite du tableau de CLAUDE.md se repetent DELIBEREMENT dans chaque
  chapitre concerne, parce que quelqu'un ouvre le livre a une page et pas a la premiere. Ce n'est PAS une
  redite et tu n'y touches pas. Si tu hesites, c'est un rappel voulu.

Classe par nombre de pages recuperees. Donne le total estime.`,
  },
  {
    id: 'conventions',
    label: 'unites et conventions',
    out: 'suivi/edition-conventions.md',
    prompt: `Controle l'application des CONVENTIONS du livre sur les 89 chapitres. Ecris dans suivi/edition-conventions.md.

Les conventions sont dans le tableau de gabarit-chapitre.md et dans CLAUDE.md. Une par une, sur tout le corpus,
avec Grep. Pour chaque manquement : le chapitre, la ligne, ce qui est ecrit, ce qui devrait l'etre.

1. METRIQUE PARTOUT. Cherche les unites imperiales : po, pouces, pi, pieds, lb, livres, oz, gallons, °F.
   L'imperial n'est tolere QU'entre parentheses ET QUE pour les dimensions de construction, parce que le bois
   se vend en pieds. Toute autre occurrence est une faute. Signale aussi les conversions fausses.
2. POURCENTAGES DE SEL. Toujours calcules sur le poids de la viande. Cherche les % de sel et verifie que la
   base de calcul est dite. Un % de sel sans base est une faute grave : c'est la difference entre comestible
   et immangeable.
3. SALPETRE. Jamais donne en quantite, toujours accompagne de sa forme moderne equivalente (nitrite/nitrate
   de sodium, sel nitrite), parce que les deux ne se dosent pas pareil. Cherche salpetre, nitrite, nitrate,
   sel rose, Prague, cure #1, cure #2.
4. NOMS LATINS. Chaque espece nommee porte son nom latin au moins une fois PAR CHAPITRE. Releve les especes
   citees sans nom latin, chapitre par chapitre.
5. SAISONS ET QUOTAS. Jamais de dates ni de limites de prises : renvoi a la reglementation de l'annee.
   Cherche les dates de saison, les mois d'ouverture, les nombres de prises, les longueurs minimales.
   C'est un risque juridique autant qu'editorial.
6. TEMPERATURES en °C toujours.

Termine par un tableau de synthese : convention, nombre de manquements, chapitres touches, gravite.`,
  },
  {
    id: 'renvois',
    label: 'reseau des renvois',
    out: 'suivi/edition-renvois.md',
    prompt: `Cartographie le RESEAU DES RENVOIS entre les 89 chapitres. Ecris dans suivi/edition-renvois.md.

Les fiches suivi/NN-redaction.md declarent les renvois de chaque chapitre : pars de la, puis verifie dans
le texte des chapitres. Il est deja etabli qu'aucun renvoi ne pointe vers un chapitre inexistant : ne le
reverifie pas. Cherche autre chose.

1. RECIPROCITE. Quand le chapitre A renvoie a B sur un sujet, est-ce que B renvoie a A quand il le faut ?
   Un renvoi a sens unique est souvent un chapitre qui ignore qu'il est cite.
2. ORPHELINS. Quels chapitres ne sont cites par PERSONNE ? Un chapitre que rien n'appelle est soit mal
   place dans le plan, soit un chapitre dont le sujet est traite ailleurs sans qu'on le sache.
3. AIMANTS. Quels chapitres sont cites par tout le monde ? Ce sont les chapitres socles : ils doivent etre
   irreprochables et ils devraient probablement etre lus en premier. Dis lesquels.
4. RENVOIS EN BOUCLE. A renvoie a B qui renvoie a A pour la meme information : l'information n'est nulle part.
   C'est le defaut le plus grave de cette section, cherche-le serieusement.
5. RENVOIS VERS UN CHAPITRE QUI NE PORTE PAS L'INFORMATION. Echantillonne 30 renvois au hasard parmi les
   plus charges et VERIFIE dans le chapitre cible que l'information annoncee s'y trouve vraiment.

Termine par la liste ordonnee des chapitres socles, et par les corrections a faire, classees par gravite.`,
  },
  {
    id: 'budget',
    label: 'budget pages et images',
    out: 'plan/budget-pages.md',
    prompt: `Fais l'ARBITRAGE DU FORMAT. Ecris dans plan/budget-pages.md.

Contrainte d'impression, non negociable : 8 x 10 po, Blurb photo book, **440 pages maximum par tome**,
papier standard couleur. Densite cible : environ 700 mots utiles par page.

Etat mesure : tome 1, 23 ch., 109 807 mots, 151 images. Tome 2, 10 ch., 53 088 mots, 130 images.
Tome 3, 27 ch., 137 234 mots, 297 images. Tome 4, 29 ch., 178 513 mots, 224 images.
Total 478 642 mots et 802 images. Le registre complet des images est dans images/credits.md, avec le
format demande pour chacune (pleine page, demi-page, quart de page).

1. Calcule les pages reelles par tome : texte + images, en comptant chaque image a son format declare
   et en ajoutant les pages de titre de partie, l'index et les annexes. Dis ta methode de calcul.
2. Dis lesquels des quatre tomes depassent 440 pages, et de combien.
3. Propose les arbitrages, classes du moins douloureux au plus douloureux. Pistes a evaluer :
   - Retrograder des images pleine page en demi-page, et lesquelles precisement
   - Couper des images redondantes : le registre en compte 802, cherche les doublons de sujet entre chapitres
   - Deplacer des chapitres d'un tome a l'autre, en disant ce que ca casse dans la logique des tomes
   - Scinder un tome en deux volumes, et ce que ca coute
   - Couper du texte, et ou exactement
4. Pour chaque arbitrage : ce qu'on gagne en pages, ce qu'on perd en usage.

Tu ne tranches pas a la place de JP. Tu chiffres les options pour qu'il tranche.`,
  },
  {
    id: 'normes',
    label: 'normes graphiques',
    out: 'plan/normes-graphiques.md',
    prompt: `Redige les NORMES GRAPHIQUES du livre, dans plan/normes-graphiques.md. Ce fichier manque et il bloque le role 6.

Le role 6 (metteur en pages) de roles.md les nomme deja en partie : grille 2 colonnes, encadres danger en
filet rouge, encadres variante d'urgence en fond gris, tableaux de controle a structure fixe, onglet de
partie, titre courant. Images : pleine page pour les planches et les cartes, demi-page pour les sequences,
quart de page pour les fiches d'espece, legende sous l'image avec credit et licence.

Ton travail : transformer ca en une norme applicable, a partir de ce que les 89 chapitres contiennent
REELLEMENT. Va voir la structure des chapitres avant d'ecrire.

Couvre :
1. Format et grille : 8 x 10 po, marges, gouttiere, fond perdu, deux colonnes, ligne de base.
2. Hierarchie typographique : titre de chapitre, les dix titres de section du gabarit, sous-titres,
   corps, legende, note. Corps de texte lisible a la lampe frontale : c'est un livre qu'on ouvre en panne.
3. Les encadres : DANGER en filet rouge, variante d'urgence en fond gris. Donne leur construction exacte.
   NOTE : la casse du titre de la section 8 varie dans le corpus — 47 chapitres ecrivent "8. Danger",
   24 ecrivent "8. DANGER", 2 ecrivent "8. ⚠ DANGER". Tranche et donne la forme unique.
4. Les tableaux : points de controle, signes d'echec, materiel. Structure fixe, alignement des nombres,
   traitement des unites.
5. Les images : les trois formats, la legende, le credit et la licence, la position dans la colonne.
6. Navigation : onglet de partie, titre courant, folio, renvois inter-chapitres (leur forme typographique).
7. Impression Blurb : profil couleur, resolution minimale des images, ce qui ne passe pas en papier standard.

Ecris une norme qu'un metteur en pages peut appliquer sans te poser de question. Quand tu ne peux pas
trancher sans JP, dis-le explicitement plutot que d'inventer une valeur.`,
  },
  {
    id: 'planmaitre',
    label: 'plan maitre',
    out: 'plan/plan-maitre.md',
    prompt: `Redige le PLAN MAITRE du livre, dans plan/plan-maitre.md. Ce fichier manque et il bloque le role 1.

Il ne s'invente pas : les 89 chapitres existent. Tu documentes le livre TEL QU'IL EST SORTI, puis tu dis
ce qui ne va pas dans sa structure.

1. La logique des quatre tomes : ce que chacun fait, pourquoi il est la, et pourquoi dans cet ordre.
2. Pour chaque tome, la logique interne des sections de chapitres : pourquoi 44 a 52 se suivent,
   pourquoi 61 a 69 precedent 70 a 73, etc.
3. Pour CHAQUE chapitre, deux a quatre lignes : ce qu'il couvre reellement (va le verifier, ne te fie pas
   au titre), sa longueur, son statut, ses dependances vers d'autres chapitres.
4. LA CRITIQUE DE STRUCTURE. C'est la partie utile. Sois dur, comme le demande le role 1 :
   - Quels chapitres se recouvrent au point qu'ils devraient fusionner ?
   - Quels chapitres sont si gros qu'ils devraient se scinder ?
   - Quel chapitre est mal place dans son tome ?
   - Qu'est-ce qui MANQUE encore, apres 89 chapitres ? Dis ou ca irait.
   - Quel chapitre ne sert a rien en pratique pour une famille de quatre sur la Cote-Nord, meme s'il
     est interessant ? Dis-le franchement.
   Classe par ce que ca coute si on ne le corrige pas.
5. L'ordre de travail qui reste, en tenant compte des echeances qui ne se rattrapent pas : les photos du
   debitage a la mi-octobre (fenetre unique, sinon octobre 2027), les recoltes d'avant la neige, et le
   thermometre enregistreur dans la cave dont un an de releves conditionne les chapitres 63 et 76.`,
  },
]

phase('Edition')
log(`${TACHES.length} agents sur l'ensemble du corpus : glossaire, redites, conventions, renvois, budget de pages, normes graphiques, plan maitre.`)

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string', description: 'chemin du document produit' },
    resume: { type: 'string', description: 'ce que tu as trouve, en 3 a 6 phrases, concret et chiffre' },
    constats: {
      type: 'array',
      description: 'les constats actionnables, du plus grave au moins grave',
      items: {
        type: 'object',
        properties: {
          gravite: { type: 'string', description: 'bloquant, important ou mineur' },
          constat: { type: 'string' },
          chapitres: { type: 'string', description: 'chapitres concernes' },
          action: { type: 'string', description: 'ce qu il faut faire' },
        },
        required: ['gravite', 'constat', 'action'],
      },
    },
    chiffresCles: { type: 'array', items: { type: 'string' }, description: 'les mesures qui resument ton analyse' },
    decisionsPourJP: { type: 'array', items: { type: 'string' }, description: 'ce que tu ne peux pas trancher a sa place' },
  },
  required: ['fichier', 'resume', 'constats', 'chiffresCles'],
}

const results = await parallel(
  TACHES.map(t => () =>
    agent(`${COMMUN}\n\n=== TA MISSION ===\n${t.prompt}\n\nTu ecris le fichier avec l'outil Write, dans ${t.out}.`, {
      label: t.label,
      phase: 'Edition',
      schema: SCHEMA,
    })
  )
)

const ok = results.filter(Boolean).length
log(`${ok}/${TACHES.length} termines`)

return TACHES.map((t, i) => {
  const r = results[i]
  if (!r) return { id: t.id, label: t.label, out: t.out, ok: false }
  return {
    id: t.id,
    label: t.label,
    out: r.fichier || t.out,
    ok: true,
    resume: r.resume,
    constats: r.constats || [],
    chiffresCles: r.chiffresCles || [],
    decisionsPourJP: r.decisionsPourJP || [],
  }
})
