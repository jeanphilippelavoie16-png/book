export const meta = {
  name: 'appliquer-bloquants',
  description: 'Applique les 20 constats bloquants de la passe d edition aux 41 chapitres concernes, un agent par fichier',
  phases: [
    { title: 'Corrections', detail: 'un agent par fichier, chacun recoit la liste des corrections qui touchent SON chapitre' },
  ],
}

const CATALOGUE = {
  THUJA: {
    t: "Nommer le thuya a la premiere mention du cedre",
    d: "Ce chapitre nomme le « cèdre » sans jamais donner *Thuja occidentalis*. Or « cèdre » désigne au Québec le thuya occidental, mais aussi le cèdre rouge de l'Ouest (*Thuja plicata*) et le genévrier dans le commerce du bois. Une règle de toxicité qui repose sur l'identification d'une plante doit nommer la plante — c'est un des neuf rappels de sécurité répétés du livre (thuyone du cèdre toxique, sapin baumier ou épinette pour la vitamine C). ACTION : à la PREMIÈRE mention du cèdre dans le chapitre, écrire « le cèdre (thuya occidental, *Thuja occidentalis*) ». Les mentions suivantes restent « cèdre ». Vérifie d'abord que le chapitre ne porte pas déjà le nom latin ailleurs : si oui, ne double pas, déplace-le simplement à la première mention.",
  },
  ALCES: {
    t: "Nom latin de l'orignal",
    d: "Ce chapitre écrit *Alces alces* SEUL. Le reste du livre (51 chapitres) écrit *Alces americanus*. ACTION : remplacer par *Alces americanus*. Si la phrase cite une page fédérale qui écrit Alces alces, garde la citation exacte et ajoute la forme du livre entre parenthèses.",
  },
  ALCES2: {
    t: "Nom latin de l'orignal, double mention dans le meme fichier",
    d: "Ce chapitre emploie les DEUX formes, *Alces alces* et *Alces americanus*, dans le même fichier. ACTION : retenir *Alces americanus* comme forme du livre. Une seule mention de la synonymie est permise, et seulement si le chapitre cite une source fédérale qui écrit Alces alces.",
  },
  ECORCHAGE: {
    t: "ecorchage vers depouillement",
    d: "Ce chapitre emploie « écorchage ». Le livre emploie « dépouillement » dans 33 chapitres, qui est aussi le mot du MAPAQ (« Procédure de dépouillement du gibier sauvage »). Le problème n'est pas stylistique : « écorchure » désigne dans 11 chapitres une plaie superficielle, porte d'entrée du tétanos et de la tularémie, et les deux mots se croisent exactement au moment du dépouillement, qui est le moment de l'avertissement tularémie. ACTION : remplacer « écorchage » par « dépouillement » partout dans ce chapitre, en accordant la phrase. Ne touche PAS à « écorchure ».",
  },
  NITRITE: {
    t: "« sel nitrite » seul",
    d: "Ce chapitre emploie « sel nitrité » seul. Le gabarit exige que le salpêtre soit toujours accompagné de sa forme moderne équivalente, parce que les deux ne se dosent pas pareil — et « sel nitrité » seul efface justement cette distinction. ACTION : deux paires fixes pour tout le livre : « salpêtre (nitrate de potassium) » et « sel de salaison nitrité (nitrite de sodium) ». Écris la paire complète à la PREMIÈRE occurrence du chapitre ; les suivantes peuvent rester courtes mais doivent dire « sel de salaison nitrité », jamais « sel nitrité » seul.",
  },
  EAU: {
    t: "BLOQUANT — la base de calcul de l'eau est a la moitie du besoin",
    d: "Ce chapitre dimensionne l'eau à 2 L par personne et par jour. Les chapitres 7, 9, 11 et 13 travaillent à 4 L (Sécurité publique Canada), et le chapitre 26 donne 9,8 L par jour pour une famille de quatre (ANREF, eau des aliments comprise) en avertissant qu'un hiver de viande séchée et de poisson salé n'apporte presque pas d'eau, donc que presque tout doit être bu. La réserve permanente du chalet est donc calculée sur la moitié du besoin. ACTION : passer la base à 4 L par personne et par jour, sourcé à Sécurité publique Canada, et RECALCULER toute la cascade : le tableau A, la cible de 24 L, la réserve tampon de 100-200 L, et tout total qui en dépend. Va lire les chapitres 9, 11, 13 et 26 pour aligner la formulation. Tout nombre que tu ne peux pas re-dériver proprement part en [À VÉRIFIER] plutôt qu'en valeur plausible. Note le changement dans ta section 10.",
  },
  ONCES: {
    t: "BLOQUANT — onces dans une posologie",
    d: "La solution de réhydratation est donnée en « 360 ml (12 oz) de jus d'orange ; 600 ml (20 oz) d'eau ; 2,5 ml (demi c. à thé) de sel », juste avant de citer la source : « utiliser les quantités exactes indiquées afin de ne pas risquer d'aggraver votre état ». Les onces sont des arrondis qui ne retombent pas : 12 + 20 onces impériales donnent 909 ml au lieu de 960, soit 5,6 % de sel en trop (1,4 % en onces américaines). ACTION : retirer les deux valeurs en onces. Ne laisser que 360 ml, 600 ml et 2,5 ml. L'impérial n'est toléré que pour les dimensions de construction, jamais pour une posologie. Vérifie s'il reste d'autres onces ailleurs dans le chapitre et applique la même règle.",
  },
  PANSEMENTS: {
    t: "BLOQUANT — boucle 27 vers 29, la rotation des pansements n'est nulle part",
    d: "Le chapitre 27 §4 écrit « ce qui se stocke, se date et se remplace appartient au chapitre 29 ». Le chapitre 29 §4 écrit « Ce chapitre-ci ne traite pas du matériel de plaie, seulement des produits » et renvoie au 27. La datation et le remplacement du matériel de pansement ne sont donc dans aucun des deux. ACTION : le chapitre 29 prend la charge, parce qu'il porte déjà tout le système de rotation du livre (deux rotations par an, registre, dates de péremption, cible de zéro produit périmé). SI TU ES LE 29 : retire la phrase d'exclusion et ajoute compresses et pansements au registre de rotation. SI TU ES LE 27 : garde ton renvoi au 29, il devient juste — vérifie seulement qu'il est formulé sans ambiguïté.",
  },
  IBUPROFENE: {
    t: "BLOQUANT — renvoi de posologie vers un chapitre qui n'en donne aucune",
    d: "Le chapitre 3 écrit dans son tableau Matériel « Ibuprofène (dose : voir ch. 29) ». Le chapitre 29 écrit « Aucune dose, aucun mg, aucun nombre de comprimés, pour aucun produit », et nomme l'acétaminophène en premier choix, pas l'ibuprofène. Un lecteur en hypothermie cherche une dose et trouve une politique éditoriale. ACTION : SI TU ES LE 3, aligne-toi sur le 29 — acétaminophène, quantité et intervalle de l'étiquette, minimum 4 heures — ou retire le renvoi de posologie. SI TU ES LE 29, ne change rien sur ce point : ta politique est la bonne, c'est le 3 qui s'aligne.",
  },
  SALPETRE: {
    t: "BLOQUANT — promesse de conversion salpetre vers nitrite que la cible refuse",
    d: "Ce chapitre promet que la conversion salpêtre vers nitrite et les barèmes sont au chapitre 63. Le chapitre 50 va jusqu'à « c'est le seul endroit du livre où ils figurent ». Or le chapitre 63 §8 écrit « Ce livre ne donne aucune quantité de salpêtre, dans aucun chapitre », et le 62 dit la même chose. Contradiction directe entre chapitres du même livre, sur un produit toxique à dose modérée. ACTION : supprime la promesse de conversion et reprends la formulation du 63 §8 — le livre ne donne aucune quantité de salpêtre. Ne touche PAS à la conversion du nitrite du commerce du chapitre 62 (masse = 20 fois M divisé par T), qui est bonne et bien placée.",
  },
  SELFLEUVE: {
    t: "BLOQUANT — boucle 63 vers 62 sur le sel du fleuve",
    d: "Le chapitre 63 §9 écrit « la teneur en sel de l'eau et le rendement en kilos par litre appartiennent au ch. 62 ; aucun chiffre n'est avancé ici ». Le chapitre 62 §10 écrit « Aucune valeur de salinité pour l'estuaire du Saint-Laurent au large de la Côte-Nord [...] la section 9 ne donne donc aucun rendement annoncé ». Le 63 demande donc au lecteur de calculer son coût en bois avec un chiffre qui n'existe pas. ACTION : SI TU ES LE 63, retire « appartiennent au ch. 62 » et reprends la formulation honnête du 62 — aucune valeur de salinité au dossier, on pèse le sel obtenu. SI TU ES LE 62, ne change rien sur ce point : ta formulation est la bonne.",
  },
  FONTE: {
    t: "BLOQUANT — renvoi vers une information qui n'existe pas",
    d: "Le chapitre 84 renvoie trois fois au chapitre 88 pour le préchauffage de la fonte, dont « Les températures de préchauffage de la fonte : voir ch. 88 et la liste des [À VÉRIFIER] au §10 ». Le chapitre 88 ne contient pas une seule occurrence du mot « fonte » ni du mot « préchauffage », et aucun de ses huit [À VÉRIFIER] ne la concerne. La fonte n'est traitée nulle part dans le livre. ACTION : SI TU ES LE 84, fais porter la limite en clair — le livre ne donne pas de température de préchauffage de la fonte — et inscris la ligne en [À VÉRIFIER] à ta section 10. SI TU ES LE 88, n'invente rien : tu ne traites pas la fonte, et c'est au 84 de le dire.",
  },
  EBULLITION: {
    t: "BLOQUANT — duree d'ebullition non arbitree sur un chapitre socle",
    d: "Le chapitre 46 (castor) retient 5 minutes à gros bouillons d'après la page québécoise sur la tularémie. Le chapitre 13 retient 1 minute (INSPQ) et ne mentionne jamais la tularémie ni l'écart. Le chapitre 44 sait que l'écart existe — sa §10 porte « Ce n'est pas la durée publiée au chapitre 13. À arbitrer par l'éditeur » — mais son bloc de renvois écrit « 13 (eau, et l'écart des cinq minutes) », comme si l'arbitrage était déjà fait au 13. Le chapitre 13 est appelé par 40 chapitres. ACTION : l'arbitrage se fait dans le CHAPITRE 13, qui est le chapitre de l'eau et un socle. SI TU ES LE 13 : nomme les deux durées, nomme la tularémie, dis laquelle s'applique à quoi et pourquoi, en citant tes sources — va lire les chapitres 44 et 46 avant d'écrire. SI TU ES LE 44 OU LE 46 : corrige ton bloc de renvois pour qu'il pointe vers l'arbitrage réel du 13, sans le pré-supposer, et garde ta propre durée avec sa source.",
  },
}

const F = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    appliquees: {
      type: 'array',
      description: 'une entree par correction demandee',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          statut: { type: 'string', description: 'appliquee, sans-objet ou refusee' },
          ceQuiAChange: { type: 'string', description: 'concretement ce que tu as edite, avec les valeurs avant et apres' },
        },
        required: ['id', 'statut', 'ceQuiAChange'],
      },
    },
    nouveauxAVerifier: { type: 'array', items: { type: 'string' }, description: 'chiffres passes en [A VERIFIER] par cette correction' },
    effetsDeBord: { type: 'string', description: 'ce que ta correction casse ailleurs dans le livre, ou chaine vide' },
  },
  required: ['fichier', 'appliquees'],
}

phase('Corrections')
log(`${F.length} fichiers, ${F.reduce((s, x) => s + x.ids.length, 0)} corrections. Un agent par fichier : personne ne touche au fichier d'un autre.`)

const results = await parallel(
  F.map(x => () => {
    const liste = x.ids.map((id, i) => `--- CORRECTION ${i + 1} / ${x.ids.length} : ${id} — ${CATALOGUE[id].t} ---\n${CATALOGUE[id].d}`).join('\n\n')
    return agent(
      `Tu es l'EDITEUR (Role 5) du projet "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte : il prime sur tout.

Les 89 chapitres sont rediges. Une passe d'edition sur l'ensemble du corpus a releve 20 constats bloquants.
Tu en appliques ${x.ids.length} au chapitre ${x.n}, et RIEN d'autre.

=== TON FICHIER, ET LE SEUL ===
${x.f}   —   Chapitre ${x.n} : ${x.t}

Tu n'ouvres aucun autre fichier en ECRITURE. Tu peux en LIRE autant que tu veux pour comprendre le contexte,
et c'est meme demande quand la correction le dit. Un autre agent travaille en ce moment sur chacun des
40 autres fichiers concernes : si tu edites le fichier d'un autre, tu ecrases son travail.

=== LES CORRECTIONS A APPLIQUER ===

${liste}

=== COMMENT TU TRAVAILLES ===
1. Lis ton chapitre en entier avant de toucher a quoi que ce soit.
2. VERIFIE le constat avant de l'appliquer. Il vient d'un agent, pas d'un oracle. Si le constat ne
   correspond pas a ce que tu lis — le mot n'y est pas, la correction est deja faite, la formulation
   citee n'existe pas — tu reponds statut "sans-objet" et tu expliques ce que tu as trouve a la place.
   Ne fabrique pas un probleme pour avoir quelque chose a corriger.
3. Si tu juges le constat FAUX ou dangereux a appliquer, tu reponds "refusee" avec ton raisonnement.
   C'est une reponse legitime et utile, pas un echec.
4. Edite avec l'outil Edit, par remplacements cibles. Tu ne reecris pas le chapitre.

=== CE QUE TU NE CASSES PAS ===
- Les DIX sections du gabarit, dans l'ordre. Elles y sont toutes : elles y restent toutes.
- AUCUN chiffre invente. Regle 1 de CLAUDE.md : chaque nombre porte sa source, ou la mention [A VERIFIER].
  Si une correction t'oblige a recalculer et que tu ne peux pas re-deriver proprement une valeur, elle part
  en [A VERIFIER]. Un chiffre plausible non source est une erreur, pas un placeholder.
- Les rappels de securite repetes. Les neuf regles du tableau de CLAUDE.md se repetent DELIBEREMENT dans
  chaque chapitre concerne, parce que quelqu'un ouvre le livre a une page et pas a la premiere. Ce ne sont
  pas des redites : tu n'en supprimes aucune.
- La densite. Tu ne rallonges pas le chapitre pour le plaisir. Une phrase qui n'apprend rien saute.
- Le francais quebecois, ton direct, pas de tutoiement du lecteur.

=== APRES TES EDITS ===
Si tu as change un chiffre, ajoute ou modifie une ligne dans la section 10 du chapitre pour le dire.
Si ta correction a un effet sur un autre chapitre, tu ne le corriges pas : tu le signales dans "effetsDeBord".`,
      { label: `ch${x.nn} ${x.t}`, phase: 'Corrections', schema: SCHEMA }
    )
  })
)

const ok = results.filter(Boolean).length
log(`${ok}/${F.length} fichiers traites`)

return F.map((x, i) => {
  const r = results[i]
  if (!r) return { n: x.n, nn: x.nn, titre: x.t, ok: false, demandees: x.ids }
  return {
    n: x.n,
    nn: x.nn,
    titre: x.t,
    ok: true,
    demandees: x.ids,
    appliquees: r.appliquees || [],
    nouveauxAVerifier: r.nouveauxAVerifier || [],
    effetsDeBord: r.effetsDeBord || '',
  }
})
