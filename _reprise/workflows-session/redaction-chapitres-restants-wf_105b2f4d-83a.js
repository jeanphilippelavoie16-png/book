export const meta = {
  name: 'redaction-chapitres-restants',
  description: 'Termine les 16 chapitres manquants (74-89) et reconstruit les 5 fiches de suivi perdues',
  phases: [
    { title: 'Redaction', detail: 'un redacteur par chapitre manquant : sources officielles, puis les dix points du gabarit' },
    { title: 'Fiches', detail: 'reconstruire la fiche de suivi des chapitres ecrits dont l agent est mort' },
  ],
}

const CH = args

const IDX = Array.from({ length: 89 }, (_, i) => i + 1)
  .map(n => {
    const found = CH.find(c => c.n === n)
    return found ? `${n}. ${found.t}` : null
  })
  .filter(Boolean)
  .join('\n')

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string', description: 'chemin du fichier chapitre' },
    motsUtiles: { type: 'number', description: 'nombre de mots utiles du chapitre' },
    encadreDanger: { type: 'boolean', description: 'le chapitre contient-il un encadre DANGER' },
    dangersTraites: { type: 'array', items: { type: 'string' }, description: 'regles de securite du tableau CLAUDE.md effectivement repetees ici' },
    relecteurHumain: { type: 'string', description: 'type de relecteur externe requis, ou chaine vide si aucun' },
    chiffresAValider: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          valeur: { type: 'string' },
          contexte: { type: 'string' },
          pourquoi: { type: 'string' },
        },
        required: ['valeur', 'contexte'],
      },
    },
    sourcesEnregistrees: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          organisme: { type: 'string' },
          url: { type: 'string' },
          fichier: { type: 'string' },
        },
        required: ['organisme', 'url'],
      },
    },
    images: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          description: { type: 'string' },
          cadrage: { type: 'string' },
          format: { type: 'string', description: 'pleine page, demi-page ou quart de page' },
        },
        required: ['description', 'cadrage'],
      },
    },
    renvois: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          chapitre: { type: 'number' },
          raison: { type: 'string' },
        },
        required: ['chapitre', 'raison'],
      },
    },
    notesPourEditeur: { type: 'string' },
  },
  required: ['fichier', 'motsUtiles', 'encadreDanger', 'dangersTraites', 'chiffresAValider', 'sourcesEnregistrees', 'images', 'renvois'],
}

const REGLES = `=== REGLES ABSOLUES ===
- AUCUN chiffre invente. Chaque nombre porte sa source entre parentheses, ou la mention [A VERIFIER]. Un chiffre plausible non source est une ERREUR, pas un placeholder. Le premier jet du chapitre pilote donnait 71 °C pour la cuisson du gibier alors que le MAPAQ dit 74 °C : c'est exactement ce qu'on evite.
- Metrique partout : °C, g, kg, L. L'imperial entre parentheses seulement pour les dimensions de construction.
- Les pourcentages de sel sont TOUJOURS calcules sur le poids de la viande.
- Salpetre : jamais donne en quantite, toujours accompagne de sa forme moderne equivalente, parce que les deux ne se dosent pas pareil.
- Nom francais d'usage pour chaque espece, avec le nom latin au moins une fois dans le chapitre.
- JAMAIS de dates de saison ni de limites de prises : renvoi a la reglementation de l'annee.
- Les rappels de securite du tableau de CLAUDE.md qui s'appliquent a CE chapitre sont repetes ICI, meme s'ils sont ailleurs dans le livre. Quelqu'un ouvre le livre a une page, pas a la premiere.
- Encadre DANGER seulement s'il y a un risque de mort ou d'intoxication grave. Pas de dilution : si l'encadre est partout, personne ne le lit. Chaque avertissement donne le MECANISME, jamais juste "attention" : le lecteur change de comportement quand il comprend pourquoi.
- Section 9, variante d'urgence : la version degradee sans electricite, sans materiel achete, sans produit specialise. Nomme honnetement ce qu'on perd en la choisissant.
- Francais quebecois, ton direct. Pas de tutoiement du lecteur dans le corps du livre, mais pas de langue de bois non plus.
- ECRIS DENSE : environ 700 mots utiles par page en 8 x 10. Pas d'introduction qui annonce ce qui suit, pas de conclusion qui resume ce qui precede, pas de "il est important de noter que". Une phrase qui n'apprend rien saute.

=== LE LECTEUR ===
JP, sa conjointe et deux enfants de 4 et 6 ans, chalet hors reseau sur la Cote-Nord : foret boreale, hivers a -35 °C, saison de jardin de 90 a 100 jours, orignal, truite, fleuve sale. Il sait souder, cabler du 12 V et abattre un orignal. Il n'a jamais sale une cuisse ni tanne une peau. Ecris pour quelqu'un de competent de ses mains et debutant en conservation.`

function promptRedaction(c) {
  return `Tu es le REDACTEUR (Role 2) du projet "Le Grand Livre du Chalet". Le fichier CLAUDE.md t'est deja injecte : il prime sur tout le reste, applique-le.

Commence par lire gabarit-chapitre.md a la racine du projet. Tu rediges UN SEUL chapitre et tu ne touches a aucun autre.

=== TON CHAPITRE ===
Chapitre ${c.n} — ${c.t}
Tome ${c.tm} — ${c.tn}
Fichier a ecrire : chapitres/${c.nn}-${c.s}.md
${c.nt ? `Note du suivi : ${c.nt}` : ''}
${c.h ? `RELECTURE HUMAINE EXTERNE OBLIGATOIRE pour ce chapitre. Nomme le relecteur requis dans la section 10 et marque-le clairement en tete de fichier.` : ''}

=== METHODE, DANS CET ORDRE ===
1. CHERCHE LES SOURCES AVANT D'ECRIRE, pas apres. WebSearch et WebFetch sur les sources officielles en priorite : MAPAQ, Sante Canada, ACIA, INSPQ, Quebec.ca, Peches et Oceans Canada, Ressources naturelles Canada, Environnement Canada, CNESST. Les sources officielles priment sur les blogues et les forums.
2. Pour CHAQUE page officielle reellement utilisee, ENREGISTRE-LA dans sources/${c.nn}-<organisme>-<sujet>.md : l'URL, la date de consultation, et l'extrait integral qui porte le chiffre. Un lien seul ne compte pas : une page de ministere qui disparait transforme un chiffre valide en chiffre invente.
3. Redige chapitres/${c.nn}-${c.s}.md selon les DIX points du gabarit, dans l'ordre, avec les titres de section du gabarit.
4. Ecris une fiche de suivi dans suivi/${c.nn}-redaction.md : les chiffres [A VERIFIER], les images requises avec leur cadrage, les renvois vers d'autres chapitres, le relecteur humain requis s'il y en a un.

${REGLES}

=== AMPLEUR ===
Un chapitre complet et dense : vise 2 500 a 5 000 mots utiles selon l'ampleur du sujet. Un chapitre de reference (listes, stocks, fiches d'espece) peut remplacer la procedure numerotee par des tableaux et etre plus court, mais il garde l'ordre general du gabarit et l'encadre danger.

=== LES 89 CHAPITRES, POUR TES RENVOIS ===
Un renvoi doit pointer vers un chapitre qui existe dans cette liste, par son numero exact. Ne renvoie jamais a un chapitre invente.
${IDX}

Tu ecris les fichiers avec l'outil Write. Ta sortie structuree recense ce qui reste a valider.`
}

function promptFiche(c) {
  return `Tu es le REDACTEUR (Role 2) du projet "Le Grand Livre du Chalet". Le fichier CLAUDE.md t'est deja injecte.

Le chapitre ${c.n} — ${c.t} a DEJA ETE REDIGE dans chapitres/${c.nn}-${c.s}.md, mais la session qui l'a ecrit est morte avant de produire sa fiche de suivi. Ta mission est de RECUPERER cette fiche.

=== CE QUE TU FAIS ===
1. Lis integralement chapitres/${c.nn}-${c.s}.md.
2. Lis gabarit-chapitre.md pour verifier que les dix points y sont, dans l'ordre.
3. Liste les fichiers deja presents dans sources/ dont le nom commence par ${c.nn}- et vois lesquels le chapitre cite.
4. Ecris la fiche suivi/${c.nn}-redaction.md : chiffres marques [A VERIFIER] avec leur contexte, images requises avec leur cadrage et leur format, renvois vers d'autres chapitres, relecteur humain requis, sources enregistrees.

=== CE QUE TU NE FAIS PAS ===
Tu ne reecris PAS le chapitre. Tu ne le rallonges pas, tu ne le corriges pas, tu ne changes aucun chiffre. Le seul cas ou tu touches au fichier du chapitre est s'il est manifestement TRONQUE au milieu d'une phrase ou s'il manque une des dix sections du gabarit : dans ce cas, complete uniquement ce qui manque, en respectant les regles ci-dessous, et dis-le dans notesPourEditeur.

${c.h ? `Ce chapitre EXIGE une relecture humaine externe. Verifie que c'est ecrit noir sur blanc dans le chapitre ; si ce n'est pas le cas, ajoute-le a la section 10 et signale-le dans notesPourEditeur.` : ''}
${c.nt ? `Note du suivi pour ce chapitre : ${c.nt}` : ''}

${REGLES}

Ta sortie structuree decrit le chapitre TEL QU'IL EST, pas tel qu'il devrait etre. Si tu n'arrives pas a compter les mots exactement, donne une estimation.`
}

phase('Redaction')
const nRed = CH.filter(c => c.mode === 'redaction').length
const nFiche = CH.filter(c => c.mode === 'fiche').length
log(`${nRed} chapitres a rediger (74 a 89), ${nFiche} fiches de suivi a reconstruire (60, 65, 71, 72, 73)`)

const results = await parallel(
  CH.map(c => () =>
    agent(c.mode === 'redaction' ? promptRedaction(c) : promptFiche(c), {
      label: c.mode === 'redaction' ? `ch${c.nn} ${c.t}` : `fiche ch${c.nn} ${c.t}`,
      phase: c.mode === 'redaction' ? 'Redaction' : 'Fiches',
      schema: SCHEMA,
    })
  )
)

const ok = results.filter(Boolean).length
log(`${ok}/${CH.length} termines`)

return CH.map((c, i) => {
  const r = results[i]
  if (!r) return { n: c.n, nn: c.nn, titre: c.t, tome: c.tm, mode: c.mode, ok: false }
  return {
    n: c.n,
    nn: c.nn,
    titre: c.t,
    tome: c.tm,
    mode: c.mode,
    ok: true,
    fichier: r.fichier,
    mots: r.motsUtiles,
    encadreDanger: r.encadreDanger,
    dangers: r.dangersTraites || [],
    relecteur: r.relecteurHumain || '',
    relectureAttendue: !!c.h,
    aValider: r.chiffresAValider || [],
    sources: r.sourcesEnregistrees || [],
    images: r.images || [],
    renvois: r.renvois || [],
    notes: r.notesPourEditeur || '',
  }
})
