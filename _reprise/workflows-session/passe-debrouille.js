export const meta = {
  name: 'passe-debrouille',
  description: 'Transforme les 92 chapitres en manuel de debrouille : sortir la conformite, garder les mecanismes, faire peser la variante d urgence plus lourd que l encadre danger',
  phases: [
    { title: 'Debrouille', detail: 'un agent par chapitre : normes dehors, securite domestique dehors, variante d urgence gonflee' },
  ],
}

const F = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    normesRetirees: { type: 'array', items: { type: 'string' }, description: 'chaque numero de norme supprime, et par quoi il est remplace' },
    conformiteRetiree: { type: 'array', items: { type: 'string' }, description: 'phrases de conformite ou de securite domestique supprimees, citees' },
    mecanismesGardes: { type: 'array', items: { type: 'string' }, description: 'ce qui ressemblait a de la conformite mais qui est un mecanisme, donc garde, avec la raison' },
    debrouilleAjoutee: { type: 'array', items: { type: 'string' }, description: 'chaque maniere de faire avec rien que tu as ajoutee ou detaillee' },
    motsDanger: { type: 'number', description: 'mots de la section 8 APRES ton travail' },
    motsUrgence: { type: 'number', description: 'mots de la section 9 APRES ton travail' },
    motsAvant: { type: 'number' },
    motsApres: { type: 'number' },
    nouveauxAVerifier: { type: 'array', items: { type: 'string' } },
    decisionsPourJP: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'normesRetirees', 'conformiteRetiree', 'debrouilleAjoutee', 'motsDanger', 'motsUrgence', 'motsAvant', 'motsApres'],
}

phase('Debrouille')
log(`${F.length} chapitres. Objectif mesurable : la variante d'urgence doit peser plus lourd que l'encadre danger. Point de depart du livre : 543 contre 846.`)

const results = await parallel(
  F.map(x => () =>
    agent(
      `Tu es l'EDITEUR du projet "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte et il a ete REECRIT
plusieurs fois depuis la redaction de ce chapitre. **Lis-le en entier avant de toucher a quoi que ce soit**,
en particulier la section "Ce que ce livre est, et ce qu'il n'est pas" et la section "Le lecteur est un pere
de deux enfants". Lis aussi gabarit-chapitre.md, dont le point 9 a change de statut.

=== CE QUE JP A DIT, DANS SES MOTS ===
"C'est pas un manuel de la CNESST que je veux, c'est un manuel de comment survivre et s'adapter a la vie
apres des catastrophes. Genre comment souder avec deux batteries, tu vois le genre, quand t'es dans marde
pi que t'as rien."

Et, sur une ligne qui listait six numeros de norme pour une scie a chaine : "on aurait juste pu marquer
scie a chaine, pas un paragraphe de marde."

Et, sur un coffre verrouille pour de l'huile a lampe : "je suis un pere de 2 enfants, je sais c'est quoi
qui est logique ou pas de laisser trainer."

=== TON FICHIER, ET LE SEUL ===
${x.f}   —   Chapitre ${x.n} : ${x.t}

Un autre agent travaille sur chacun des autres chapitres. Tu LIS ce que tu veux, tu N'ECRIS que dans ton
fichier.

=== CE QUE TU FAIS, DANS CET ORDRE ===

**1. SORTIR TOUS LES NUMEROS DE NORME.** Aucun ne reste. Ni CSA, ni CAN/CSA, ni NF EN, ni ASTM, ni ULC,
ni ANSI, ni ISO, ni NFPA. Cherche-les avec Grep avant de lire.
Ce qui remplace le numero, c'est **ce que la piece fait**. Exemple canonique de CLAUDE.md :
  AVANT : "Pantalon forestier de protection contre les coups de scie (NF EN 381-5, ou ASTM F3325 cat. A,
  C ou D), casque haute visibilite (CSA Z94.1), protecteur oculaire et visiere (CAN/CSA Z94.3),
  protecteurs auditifs (CSA Z94.2), bottes anti-coupures (CSA Z195)"
  APRES : "**Scie a chaine.** Le pantalon de coupe bourre la chaine et l'arrete : c'est la seule piece qui
  fait quelque chose plutot que de couvrir."

**2. SORTIR LA CONFORMITE ET LA SECURITE DOMESTIQUE.** Trois familles, toutes a couper :
- Ce qui renvoie a quelqu'un : "faire appel a un professionnel", "entrepreneur certifie", "detenteur d'une
  licence", "installer par un accredite", "remplacer par une piece d'origine", "voir un concessionnaire".
  Le test de CLAUDE.md : **il n'y a personne a appeler.** Pas d'entrepreneur, pas de concession, pas de
  quincaillerie ouverte, pas de piece en commande.
- Ce qui renvoie a un reglement : "conforme a la norme", "selon le code", "obligation reglementaire",
  l'equipement de protection decrit comme une exigence plutot que comme un outil.
- **Le conseil de securite domestique ordinaire.** Ranger les produits, verrouiller un coffre, surveiller
  un enfant pres du poele, mettre les allumettes en hauteur. Le lecteur est un pere de deux enfants de 4
  et 6 ans : il sait. Ca ne s'adoucit pas, ca se coupe.

**3. CE QUI RESTE, ET QUI NE SE TOUCHE PAS.** La ligne de partage est dans CLAUDE.md :
**le mecanisme reste, la conformite saute.**
- "Le monoxyde de carbone n'a ni odeur ni couleur, tu t'endors au lieu de sortir" : ca reste.
- "Un avertisseur de CO conforme n'a pas l'obligation de declencher avant 30 jours a 30 ppm, donc un
  avertisseur silencieux ne prouve rien" : ca reste, c'est du contre-intuitif pur.
- "Une pile bouton avalee brule l'oesophage par electrolyse" : ca reste.
- "L'appareil doit etre installe par un entrepreneur licencie" : ca saute.
Les **neuf rappels de securite** du tableau de CLAUDE.md sont tous des mecanismes. **Aucun ne saute**, et
ils continuent de se repeter dans chaque chapitre concerne. Dans le doute entre "conformite" et "rappel
de securite repete", c'est un rappel : tu le gardes.

**4. GONFLER LA VARIANTE D'URGENCE (section 9). C'est le coeur du travail.**
Aujourd'hui, dans l'ensemble du livre, l'encadre DANGER pese 846 mots en mediane et la variante d'urgence
543. **Le livre avertit 1,65 fois plus qu'il n'enseigne la debrouille. C'est ca qu'on renverse.**
Ton objectif chiffre : **la section 9 de ton chapitre pese plus que sa section 8.**

Ca ne se fait pas en delayant. Ca se fait en ECRIVANT CE QUI MANQUE :
- La maniere de faire la chose **avec rien**. Detaillee, en etapes, pas mentionnee en passant.
- L'outil qu'on fabrique quand on ne l'a pas.
- La piece qu'on repare au lieu de la remplacer, et avec quoi.
- Le substitut reel : ce qui remplace le produit du commerce, et ce qu'on perd en rendement, en duree de
  garde ou en marge d'erreur.
- Ce qui ne se remplace vraiment pas — dit franchement, sans broder autour.

L'esprit, dans les mots de JP : **souder avec deux batteries de char montees en serie.** Chaque fois qu'une
manière de faire avec rien existe pour ton sujet, elle se trouve ici, detaillee.
${x.atelier ? `\n**CE CHAPITRE EST UN CHAPITRE D'ATELIER.** C'est exactement la ou la debrouille est le sujet et non
l'annexe. Il porte ${x.cnesst} mentions de CNESST ou d'equipement de protection : c'est le plus charge du
livre ou presque. Ne te contente pas de couper — ECRIS la version debrouille du geste.` : ''}

**5. LA COLONNE SUBSTITUTION du tableau Materiel** est maintenant la plus importante du tableau, parce que
c'est elle qui sert le jour ou l'item n'est pas la. Elle merite plus de soin que la colonne Item. Remplis-la
partout ou elle dit "aucune" sans que ce soit vrai.

=== CE QUE TU NE CASSES PAS ===
- **Les NEUF sections du gabarit, dans l'ordre.** Il n'y a plus de section 10 : n'en recree pas, et ne
  renvoie jamais vers elle.
- **AUCUN chiffre invente.** Regle 1. Chaque nombre porte sa source en trois mots dans le texte —
  "74 °C (MAPAQ)" — ou la mention [A VERIFIER]. Si tu ajoutes une technique de debrouille qui demande un
  chiffre que tu ne peux pas sourcer, ecris la technique et marque le chiffre [A VERIFIER]. **N'invente
  jamais une temperature, une duree, un ratio ou une dose pour rendre une methode credible.**
- **L'encadre DANGER et ses mecanismes.** Tu ne le vides pas : tu en sors la conformite s'il y en a, et
  tu laisses tout ce qui dit POURQUOI ca tue. S'il raccourcit, c'est parce qu'il contenait du reglement,
  jamais parce que tu as enleve un mecanisme.
- **Le vocabulaire arbitre** (plan/glossaire.md) : *Alces americanus*, "depouillement" et non "ecorchage",
  "salpetre (nitrate de potassium)", "sel de salaison nitrite (nitrite de sodium)".
- **La ligne de lieu** (Maison / Chalet / Les deux) posee a la passe precedente, et le cadrage qui va avec.
- **Le francais quebecois, ton direct**, pas de tutoiement du lecteur dans le corps du livre.
- **La densite.** Une phrase qui n'apprend rien saute. Tu ne rallonges pas pour rallonger : si ta section 9
  grossit, c'est parce qu'elle contient des gestes neufs, pas des paragraphes de transition.

=== AVANT DE FINIR ===
Compte les mots de ta section 8 et de ta section 9. Si la 9 ne pese pas plus que la 8, retourne y travailler,
ou explique dans decisionsPourJP pourquoi ce chapitre-la fait exception — il y en aura, et c'est une reponse
legitime quand le sujet est un danger sans geste de remplacement.

Edite avec l'outil Edit, par remplacements cibles.`,
      { label: `ch${x.nn} ${x.t}`, phase: 'Debrouille', schema: SCHEMA }
    )
  )
)

const ok = results.filter(Boolean).length
log(`${ok}/${F.length} chapitres passes a la debrouille`)

return F.map((x, i) => {
  const r = results[i]
  if (!r) return { n: x.n, nn: x.nn, titre: x.t, ok: false }
  return {
    n: x.n,
    nn: x.nn,
    titre: x.t,
    ok: true,
    normesRetirees: r.normesRetirees || [],
    conformiteRetiree: r.conformiteRetiree || [],
    mecanismesGardes: r.mecanismesGardes || [],
    debrouilleAjoutee: r.debrouilleAjoutee || [],
    motsDanger: r.motsDanger,
    motsUrgence: r.motsUrgence,
    renverse: (r.motsUrgence || 0) > (r.motsDanger || 0),
    motsAvant: r.motsAvant,
    motsApres: r.motsApres,
    nouveauxAVerifier: r.nouveauxAVerifier || [],
    decisionsPourJP: r.decisionsPourJP || [],
  }
})
