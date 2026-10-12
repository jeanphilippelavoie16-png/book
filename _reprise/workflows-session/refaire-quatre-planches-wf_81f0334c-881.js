export const meta = {
  name: 'refaire-quatre-planches',
  description: 'Refait les planches 13-01, 15-01, 65-01 et 82-01 au nouveau gabarit, en corrigeant les defauts releves par JP',
  phases: [
    { title: 'Planches', detail: 'un agent par planche, verdict de JP en main' },
  ],
}

const P = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    format: { type: 'string' },
    viewBox: { type: 'string' },
    ceQuiACoupe: { type: 'array', items: { type: 'string' }, description: 'chaque element retire, et la phrase qui le remplace dans le chapitre si c en est une' },
    ceQuiAChange: { type: 'array', items: { type: 'string' } },
    renvois: { type: 'array', items: { type: 'string' }, description: 'la legende finale, six au plus' },
    reconnaissableSansLegende: { type: 'string', description: 'ce qu on nomme en regardant le dessin, legende cachee' },
    chiffresUtilises: { type: 'array', items: { type: 'string' }, description: 'chaque nombre porte sur la planche et sa provenance dans le chapitre' },
    verificateur: { type: 'string' },
    phrasesPourLeChapitre: { type: 'array', items: { type: 'string' }, description: 'ce qui sort du dessin et doit aller dans le texte' },
  },
  required: ['fichier', 'format', 'viewBox', 'ceQuiACoupe', 'renvois', 'reconnaissableSansLegende', 'chiffresUtilises', 'verificateur'],
}

phase('Planches')
log(`${P.length} planches a refaire. Nouveau gabarit : pleine page 680x826, demi-page 680x413, quart 340x413.`)

const results = await parallel(
  P.map(p => () =>
    agent(
      `Tu refais UNE planche du "Grand Livre du Chalet". CLAUDE.md t'est deja injecte.

=== LIS LE SKILL, IL A CHANGE ===
.claude/skills/planches/SKILL.md en entier — il a ete reecrit a partir des critiques de JP.
Puis references/svg-technique.md et references/types-de-planches.md.

Les regles qui ont tue des planches ces derniers jours, et que tu dois tenir :
- **Une planche montre un objet ou un geste, jamais une donnee.** Une echelle de tailles,
  une courbe, un classement : c'est du texte ou un tableau.
- **Ecris la phrase que la planche remplacerait. Si elle suffit, il n'y a pas de dessin.**
- **Le dessin se reconnait AVANT qu'on lise la legende.** Cache la legende et regarde :
  si tu ne peux pas nommer les objets, personne ne le pourra.
- **Six renvois au maximum, cinq ou six mots chacun.** Passe ca, la legende est un pave.
- **Jamais de bloc <style>** : chaque forme porte ses attributs. Sinon la planche s'ouvre blanche.
- **Aucun chiffre invente.** Chaque nombre vient du chapitre, sinon il n'est pas sur la planche.

=== NOUVEAU GABARIT ===
L'ancien format pleine page 680 x 900 etait trop haut de 9 % et mordait dans la marge.
  Pleine page  : viewBox 0 0 680 826
  Demi-page    : viewBox 0 0 680 413
  Quart de page: viewBox 0 0 340 413
**Le format suit le contenu.** Si ce qui reste apres tes coupes tient en demi-page, fais
une demi-page : une pleine page a moitie vide gaspille une page du livre.

=== TA PLANCHE ===
${p.ref} — ${p.nom}
Fichier : ${p.fichier}   (l'ancienne version est sauvegardee, tu ecrases celui-ci)
Chapitre source : chapitres/${p.src}

=== CE QUE JP EN A DIT, DANS SES MOTS ===
${p.verdict}

=== CE QUE TU FAIS ===
${p.consigne}

=== METHODE ===
1. Lis l'ancienne version du fichier, puis le chapitre source en entier.
2. Pose la composition en coordonnees avant d'ecrire.
3. Dessine. Verifie avec : node .claude/skills/planches/scripts/verifier-planche.js ${p.fichier}
   Tout ce qui sort en DUR se corrige. Recopie la sortie finale dans verificateur.
4. Cache la legende, regarde, et ecris dans reconnaissableSansLegende ce que tu nommes.
   Si c'est « des rectangles et des traits », recommence.
5. Relis en te demandant ce que tu enleves.

Tu n'ecris QUE ton fichier. Trois autres agents refont chacun une autre planche.`,
      { label: `pl ${p.ref} ${p.nom.slice(0, 28)}`, phase: 'Planches', schema: SCHEMA }
    )
  )
)

log(`${results.filter(Boolean).length}/${P.length} planches refaites`)
return P.map((p, i) => ({ ref: p.ref, r: results[i] || null }))
