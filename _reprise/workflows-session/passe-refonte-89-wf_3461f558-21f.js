export const meta = {
  name: 'passe-refonte-89',
  description: 'Passe de refonte sur les 89 chapitres : ligne de lieu maison/chalet, purge des evidences, reparation des renvois vers la section 10 supprimee, inventaires vers le chapitre d achat',
  phases: [
    { title: 'Refonte', detail: 'un agent par chapitre : lieu, evidences, renvois orphelins, inventaires, etoffement' },
  ],
}

const F = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    lieu: { type: 'string', description: 'Maison, Chalet ou Les deux — le lieu retenu' },
    pourquoiCeLieu: { type: 'string', description: 'en une phrase' },
    evidencesRetirees: { type: 'array', items: { type: 'string' }, description: 'les lignes supprimees, citees' },
    evidencesGardees: { type: 'array', items: { type: 'string' }, description: 'les lignes gardees parce qu elles enseignent, avec la raison' },
    renvoisSection10: { type: 'string', description: 'ce que tu as fait des renvois vers la section 10 supprimee, ou sans-objet' },
    inventaireDeplace: { type: 'string', description: 'ce que tu as sorti vers le chapitre d achat 00b, ou sans-objet' },
    etoffement: { type: 'string', description: 'ce que tu as ajoute si le chapitre etait maigre, ou sans-objet' },
    motsAvant: { type: 'number' },
    motsApres: { type: 'number' },
    nouveauxAVerifier: { type: 'array', items: { type: 'string' } },
    decisionsPourJP: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'lieu', 'pourquoiCeLieu', 'evidencesRetirees', 'motsAvant', 'motsApres'],
}

phase('Refonte')
log(`${F.length} chapitres, un agent chacun. ${F.filter(x => x.s10).length} ont un renvoi orphelin vers la section 10 supprimee, ${F.filter(x => x.maigre).length} sont maigres, ${F.filter(x => x.inv).length} sont des chapitres d'inventaire.`)

const results = await parallel(
  F.map(x => () => {
    const taches = []
    taches.push(`**1. LA LIGNE DE LIEU.** Ajoute, juste avant la section 1, une ligne : \`Maison\`, \`Chalet\` ou \`Les deux\`.
   C'est TOI qui tranches, d'apres le sujet du chapitre et la regle de CLAUDE.md : ce qui est court se vit a la
   maison (elle a Hydro, l'aqueduc, l'egout et les voisins), ce qui dure finit au chalet (il a le bois, l'eau et
   le territoire). Les premiers chapitres du livre se passent a la maison ; le long terme est au chalet.
   Puis RECADRE le texte en consequence. Un chapitre "Maison" qui parle de generatrice ne suppose pas un chalet
   hors reseau ; un chapitre "Maison" donne l'adaptation au chalet LA OU ELLE CHANGE QUELQUE CHOSE, en une ou
   deux phrases, pas partout. Un chapitre "Chalet" assume le chalet et ne fait pas semblant.
   Le chapitre parle actuellement du chalet par defaut partout : c'est ca qu'il faut corriger quand le lieu est
   la maison.`)

    taches.push(`**2. PURGER LES EVIDENCES.** Cherche les listes "quand c'est un mauvais choix", "c'est la mauvaise
   reponse quand", et toute autre liste du meme genre, dans TOUT le chapitre et pas seulement en section 2.
   Supprime chaque entree qu'un adulte sense devine tout seul : sortir si le batiment brule, obeir aux autorites
   qui ordonnent l'evacuation, ne pas rester si une vie est en jeu, appeler les secours si on peut.
   GARDE l'entree seulement si elle dit quelque chose de CONTRE-INTUITIF — par exemple que devant une source
   radiologique perdue on s'eloigne au lieu de se confiner, ce qui est l'inverse du reflexe.
   Si la liste tombe a deux entrees vraies, elle fait deux entrees. Si elle tombe a zero, elle saute au complet
   et la section 2 garde seulement "quand l'utiliser".
   Cite dans ta sortie structuree ce que tu retires ET ce que tu gardes, avec la raison.`)

    if (x.s10) {
      taches.push(`**3. REPARER LES RENVOIS VERS LA SECTION 10.** Ce chapitre renvoie encore a une section 10 qui
   N'EXISTE PLUS : elle a ete retiree des 89 chapitres. Cherche "section 10", "§10", "au point 10", "la liste
   des [A VERIFIER] de la section 10", y compris dans l'encadre de relecture en tete de fichier.
   Chaque renvoi orphelin se repare d'une de ces deux facons, jamais autrement :
   - Si l'information renvoyee est utile au lecteur, RAPATRIE-LA sur place, en une phrase, la ou le renvoi etait.
   - Si elle ne l'est pas, supprime le renvoi.
   Ne cree JAMAIS un renvoi vers une section qui n'existe pas.`)
    }

    if (x.inv) {
      taches.push(`**3bis. VIDER L'INVENTAIRE.** Ce chapitre est un des six chapitres de listes du livre (8, 9, 10,
   11, 12, 85). Desormais **il n'y a qu'un seul inventaire dans le livre**, le chapitre 00b "Acheter par
   priorite", ecrit en ce moment meme par un autre agent — tu ne peux pas le lire, renvoie-y par son numero.
   Ce chapitre-ci garde sa METHODE et sa LOGIQUE — comment on decide quoi stocker, comment on fait tourner un
   stock, comment on calcule une duree, ce qui se perime et pourquoi — et il perd la LISTE D'ACHAT elle-meme,
   qui part au 00b. Ce n'est pas un vidage : un chapitre qui explique comment penser son stock vaut plus qu'un
   chapitre qui enumere des boites de conserve.
   Si apres ca le chapitre n'a plus de raison d'exister, DIS-LE dans decisionsPourJP au lieu de le remplir.`)
    }

    if (x.maigre) {
      taches.push(`**4. ETOFFER.** Ce chapitre fait ${x.mots} mots bruts, sous la mediane du livre (6 064).
   Une fois les evidences retirees il sera encore plus court, et c'est le bon moment pour ecrire ce qui manque.
   CHERCHE LES SOURCES OFFICIELLES AVANT D'ECRIRE et enregistre les pages utilisees dans sources/${x.nn}-*.md.
   N'ajoute pas du volume : ajoute ce qui manque. Procedure trop vague, cas qui n'est pas traite, chiffre absent,
   mecanisme explique a moitie, point de controle sans cible. Regle 1 : aucun chiffre invente, chaque nombre porte
   sa source en trois mots dans le texte — "74 °C (MAPAQ)" — ou la mention [A VERIFIER].`)
    }

    return agent(
      `Tu es l'EDITEUR du projet "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte et il a ETE REECRIT :
lis-le en entier avant de commencer, il a change sur des points qui te concernent directement.

Lis aussi gabarit-chapitre.md, qui est passe de DIX a NEUF points.

=== CE QUI A CHANGE DANS LE PROJET ===
- **Deux lieux.** La maison au village, sur le reseau. Le chalet hors reseau, isole, qui porte le territoire.
  Ce qui est court se vit a la maison ; ce qui dure finit au chalet.
- **La section 10 (Sources) a ete SUPPRIMEE** des 89 chapitres. Le gabarit fait neuf points. Le travail de
  source ne change pas — sources officielles cherchees avant d'ecrire, pages enregistrees dans /sources,
  regle 1 intacte — mais l'attribution se fait EN TROIS MOTS DANS LE TEXTE et il n'y a plus de liste a la fin.
- **Les evidences sont interdites.**
- **Un seul inventaire dans le livre**, le chapitre 00b.
- **Usage prive.** Le livre ne sera pas publie ni vendu : il est fait pour la famille de JP.

=== TON FICHIER, ET LE SEUL ===
${x.f}   —   Chapitre ${x.n} : ${x.t}   (tome ${x.tm}, ${x.mots} mots bruts)

Un autre agent travaille en ce moment sur chacun des 88 autres chapitres. Tu peux LIRE ce que tu veux,
tu n'ECRIS que dans ton fichier. Si tu edites celui d'un autre, tu ecrases son travail.

=== CE QUE TU FAIS ===

${taches.join('\n\n')}

=== CE QUE TU NE CASSES PAS ===
- **Les NEUF sections du gabarit, dans l'ordre.** Elles y sont : elles y restent. Il n'y a plus de section 10.
- **AUCUN chiffre invente.** Regle 1. Un chiffre plausible non source est une erreur, pas un placeholder.
- **Les rappels de securite repetes.** Les neuf regles du tableau de CLAUDE.md se repetent DELIBEREMENT dans
  chaque chapitre concerne, parce que quelqu'un ouvre le livre a une page et pas a la premiere. Ce ne sont PAS
  des evidences et tu n'en supprimes aucune. Si tu hesites entre "evidence" et "rappel de securite repete",
  c'est un rappel de securite : tu le gardes.
- **L'encadre DANGER** et son mecanisme. Un avertissement qui dit POURQUOI change un comportement ; "soyez
  prudent" ne fait rien. Ne remplace jamais un mecanisme par une consigne.
- **Le vocabulaire du glossaire** (plan/glossaire.md) : *Alces americanus* pour l'orignal, "depouillement" et
  non "ecorchage", "salpetre (nitrate de potassium)" et "sel de salaison nitrite (nitrite de sodium)".
- **Le francais quebecois, ton direct**, pas de tutoiement du lecteur dans le corps du livre.
- **La densite.** Une phrase qui n'apprend rien saute. Pas d'introduction qui annonce, pas de conclusion qui
  resume, pas de "il est important de noter que".

Edite avec l'outil Edit, par remplacements cibles. Tu ne reecris pas le chapitre au complet.`,
      { label: `ch${x.nn} ${x.t}`, phase: 'Refonte', schema: SCHEMA }
    )
  })
)

const ok = results.filter(Boolean).length
log(`${ok}/${F.length} chapitres refondus`)

return F.map((x, i) => {
  const r = results[i]
  if (!r) return { n: x.n, nn: x.nn, titre: x.t, ok: false }
  return {
    n: x.n,
    nn: x.nn,
    titre: x.t,
    tome: x.tm,
    ok: true,
    lieu: r.lieu,
    pourquoiCeLieu: r.pourquoiCeLieu,
    evidencesRetirees: r.evidencesRetirees || [],
    evidencesGardees: r.evidencesGardees || [],
    renvoisSection10: r.renvoisSection10 || '',
    inventaireDeplace: r.inventaireDeplace || '',
    etoffement: r.etoffement || '',
    motsAvant: r.motsAvant,
    motsApres: r.motsApres,
    nouveauxAVerifier: r.nouveauxAVerifier || [],
    decisionsPourJP: r.decisionsPourJP || [],
  }
})
