export const meta = {
  name: 'neuf-chapitres-nouveaux',
  description: 'Ecrit neuf chapitres nouveaux (pain, tente d hiver, raquettes, canot, dents, electricite, armes, ouvrir-fermer le chalet, table aliment-methode) : redaction a la source, deux verifications, correction',
  phases: [
    { title: 'Redaction', detail: 'un redacteur par chapitre, recherche a la source avant d ecrire' },
    { title: 'Verification', detail: 'verificateur technique et verificateur securite, en parallele' },
    { title: 'Correction', detail: 'applique les deux verifications' },
  ],
}

const CONTEXTE = `Tu travailles sur « Le Grand Livre du Chalet », un manuel de survie et d'autonomie en quatre tomes pour une famille de la Côte-Nord. Le projet est dans C:\\Users\\jeanp\\New folder. **CLAUDE.md est dans ton contexte : il prime sur tout.** Relis en particulier : ce que le livre n'est pas (pas un manuel de la CNESST, aucun numéro de norme, « il n'y a personne à appeler »), le lecteur (un père de deux enfants de 4 et 6 ans, qui soude, câble du 12 V et abat un orignal ; aucun conseil de sécurité domestique ordinaire), les deux lieux (maison au village sur le réseau, chalet hors réseau ; ce qui est court se vit à la maison, ce qui dure finit au chalet), ce qui ne s'imprime pas (aucune section Sources, **aucune attribution de source dans le texte**, aucune évidence, pas d'inventaire éparpillé : ce qui s'achète renvoie au chapitre 00b), et **la règle 1 : aucun chiffre inventé** — on cherche la source avant d'écrire, on enregistre la page dans /sources, on note la provenance dans suivi/NN-redaction.md, ce qui ne se trouve pas porte [À VÉRIFIER].

Aussi, trois règles venues de JP depuis :
- **Pas de paperasse.** Aucun registre, carnet, cahier, relevé à tenir « pour plus tard » : personne ne fait ça, épuisé, dans le bois. Un fait qui sert s'écrit sur la chose même (la date au feutre sur le pot).
- **La débrouille est le cœur.** La section 9 (variante d'urgence) est le cœur du chapitre, pas sa queue : ce qu'on fait avec rien, avec ce qui traîne, et qu'on fabrique.
- **Les savoirs autochtones** : quand une technique vient des Innus ou d'une autre nation du Nord, lis la section « Précautions » de suivi/idees-savoirs-autochtones.md et applique sa règle pour nommer l'origine sans en faire une attribution de source. Rien de sacré ou de cérémoniel.

Le gabarit est dans gabarit-chapitre.md (neuf points, ligne de lieu avant le point 1). Le plan maître est dans plan/plan-maitre.md, le glossaire dans plan/glossaire.md (vocabulaire et noms latins arbitrés : respecte-les). Les chapitres existants sont dans chapitres/ : **vérifie qu'un renvoi pointe vers ce que le chapitre visé dit vraiment**, et ne réécris pas ce qu'un autre chapitre traite déjà : renvoie. Français québécois, direct, dense (environ 700 mots utiles par page), pas de tutoiement du lecteur.`

const CHAPITRES = args

const SCHEMA_R = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    mots: { type: 'number' },
    resume: { type: 'string' },
    sources: { type: 'array', items: { type: 'string' } },
    aVerifier: { type: 'array', items: { type: 'string' } },
    planchesVoulues: { type: 'array', items: { type: 'string' }, description: 'les choses a fabriquer du chapitre qui meritent une planche' },
    decisionsPourJP: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'mots', 'resume', 'sources', 'aVerifier', 'planchesVoulues', 'decisionsPourJP'],
}
const SCHEMA_V = {
  type: 'object',
  properties: {
    constats: {
      type: 'array',
      items: {
        type: 'object',
        properties: { gravite: { type: 'string', enum: ['bloquant', 'important', 'mineur'] }, ou: { type: 'string' }, probleme: { type: 'string' }, correction: { type: 'string' } },
        required: ['gravite', 'ou', 'probleme', 'correction'],
      },
    },
  },
  required: ['constats'],
}
const SCHEMA_C = {
  type: 'object',
  properties: { fichier: { type: 'string' }, appliques: { type: 'number' }, ecartes: { type: 'array', items: { type: 'string' } }, mots: { type: 'number' } },
  required: ['fichier', 'appliques', 'ecartes', 'mots'],
}

const res = await pipeline(
  CHAPITRES,
  c => c.ecrit ? Promise.resolve({ c, r: null }) : agent(`${CONTEXTE}\n\n=== TA MISSION : RÉDIGER ===\n**Chapitre ${c.num} — ${c.titre}**, tome ${c.tome}, dans \`chapitres/${c.fichier}\`. Ligne de lieu : **${c.lieu}**.\n\n${c.brief}\n\nCherche les sources AVANT d'écrire (charge WebSearch et WebFetch avec ToolSearch, « select:WebSearch,WebFetch »), enregistre chaque page dans sources/ au format des autres fiches, crée suivi/${c.fichier.replace('.md', '').split('-')[0]}-redaction.md sur le modèle des autres fiches de suivi (provenance de chaque chiffre, [À VÉRIFIER]${c.reprise ? '' : ", relecteur humain requis s'il y a lieu"}). Écris le chapitre avec Write. Ne modifie aucun autre chapitre : ce qui cloche ailleurs va dans decisionsPourJP.`,
    { label: `rédaction ${c.num}`, phase: 'Redaction', schema: SCHEMA_R })
    .then(r => ({ c, r })),
  async x => {
    // reprise : une vérification déjà faite est dans un fichier JSON (x.c.ancienTech / x.c.ancienSecu), on ne la refait pas
    const [tech, secu] = await parallel([
      () => x.c.ancienTech ? Promise.resolve({ constats: [], fichier: x.c.ancienTech }) : agent(`${CONTEXTE}\n\n=== TA MISSION : VÉRIFICATEUR TECHNIQUE ===\nTu n'as pas rédigé ce chapitre et tu ne le réécris pas. Relis \`chapitres/${x.c.fichier}\` et sa fiche de suivi. Pour CHAQUE chiffre, ratio, température, durée, quantité, dimension et nom d'espèce : retrouve-le dans la source enregistrée ou dans une source publiée (charge WebFetch avec ToolSearch). S'il diffère, donne les deux valeurs. S'il est introuvable, dis-le. Vérifie chaque renvoi à un autre chapitre : le chapitre visé dit-il vraiment ça ? Vérifie que les montages décrits marcheraient pour vrai (une fumée qui a un chemin, une charge qui porte sur quelque chose, un circuit qui se ferme). Signale toute attribution de source restée dans le texte, toute paperasse, toute évidence. Tu signales, tu ne corriges pas.`,
        { label: `vérif technique ${x.c.num}`, phase: 'Verification', schema: SCHEMA_V }),
      () => x.c.ancienSecu ? Promise.resolve({ constats: [], fichier: x.c.ancienSecu }) : agent(`${CONTEXTE}\n\n=== TA MISSION : VÉRIFICATEUR SÉCURITÉ ===\nTu n'as pas rédigé ce chapitre et tu ne le réécris pas, et tu ne juges pas le style. Relis \`chapitres/${x.c.fichier}\`. Cherche : les rappels de sécurité du tableau de CLAUDE.md qui s'appliquent et qui manquent ; un geste dangereux décrit sans son mécanisme ; un danger réel absent de l'encadré ; une consigne qui tuerait si on l'appliquait à la lettre. Et dans l'autre sens : tout conseil de sécurité domestique ordinaire, toute conformité réglementaire, tout « faire appel à un professionnel » — ça sort. Le mécanisme reste, la conformité saute. Tu signales, tu ne corriges pas.`,
        { label: `vérif sécurité ${x.c.num}`, phase: 'Verification', schema: SCHEMA_V }),
    ])
    if (!tech || !secu) return { num: x.c.num, fichier: x.c.fichier, erreur: `vérification manquante : ${!tech ? 'technique ' : ''}${!secu ? 'sécurité' : ''}` }
    const constats = [...(tech.constats || []).map(k => ({ ...k, par: 'technique' })), ...(secu.constats || []).map(k => ({ ...k, par: 'sécurité' }))]
    const corr = await agent(`${CONTEXTE}\n\n=== TA MISSION : CORRIGER ===\nLe chapitre \`chapitres/${x.c.fichier}\` a été relu par deux vérificateurs. Voici leurs constats :\n${JSON.stringify(constats, null, 1)}${[tech.fichier, secu.fichier].filter(Boolean).length ? `\n\n**D'autres constats de ces vérificateurs sont dans ${[tech.fichier, secu.fichier].filter(Boolean).map(f => '`' + f + '`').join(' et ')}** (JSON, à lire avec Read) : ils comptent autant que ceux ci-dessus.` : ''}\n\nApplique chaque constat bloquant et important, et les mineurs qui ont raison. Quand un constat demande un chiffre, prends-le dans la source (enregistre-la dans sources/ si elle ne l'est pas) ou mets [À VÉRIFIER] — n'invente rien. Mets à jour la fiche de suivi. Corrige avec Edit, sans réécrire le chapitre en entier. Dis ce que tu as écarté et pourquoi.

**Quatre règles de JP, à appliquer au chapitre entier même si aucun vérificateur ne les signale** (elles sont dans CLAUDE.md) :
1. **Pas de relecture extérieure.** Aucune mention de relecteur, de relecture, de « à faire confirmer par un dentiste / un pharmacien / un spécialiste » dans le chapitre. Un drapeau qui nomme un relecteur devient \`[À VÉRIFIER]\` nu, ou \`[À VÉRIFIER : ce qui manque]\` sans nommer personne. Dans la fiche de suivi, remplace « relecteur humain requis » par la liste des points à vérifier à la source.
2. **Pas de municipalité, pas de code légal.** Aucune phrase sur un règlement, une loi, un permis, une norme, une obligation légale, ni sur la municipalité comme service (alertes, centre de sinistrés, « prévenir la municipalité »). Le mécanisme que la règle protège reste, dit comme un fait.
3. **Un signe nommé s'explique.** Tout signe, symptôme ou repère que le lecteur ne reconnaîtrait pas sans description, et que le chapitre ne décrit pas, reçoit une note de bas de page Markdown (\`[^1]\` dans le texte, \`[^1]: …\` à la fin) : à quoi ça ressemble, comment on le voit ou le teste. Sourcé comme le reste.
4. **Les méthodes ancestrales restent**, même quand elles contredisent une règle du livre : on dit pourquoi elles marchent dans leurs conditions, et un avertissement dit ce qui les rend dangereuses si on change ces conditions.`,
      { label: `correction ${x.c.num}`, phase: 'Correction', schema: SCHEMA_C })
    return { num: x.c.num, fichier: x.c.fichier, redaction: x.r, constats: constats.length, bloquants: constats.filter(k => k.gravite === 'bloquant').length, correction: corr }
  }
)
return res
