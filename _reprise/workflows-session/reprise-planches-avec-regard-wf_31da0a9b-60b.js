export const meta = {
  name: 'reprise-planches-avec-regard',
  description: 'Reprend cinq planches : dessin, rendu et regard, puis relecture visuelle independante et correction',
  phases: [
    { title: 'Dessin', detail: 'le dessinateur corrige, rend la planche en PNG et la regarde jusqu a ce qu elle tienne' },
    { title: 'Relecture', detail: 'un directeur artistique independant rend, regarde, et refuse s il y a quoi que ce soit' },
    { title: 'Correction', detail: 'le dessinateur corrige ce que la relecture a trouve' },
  ],
}

const P = args

const OUTILS = `Les outils du skill, tous dans .claude/skills/planches/scripts/ :
- verifier-planche.js <svg>   controle ce qui se MESURE. Tout DUR se corrige.
- rendre-planche.js <svg>     rend la planche en PNG et imprime son chemin. Ouvre ce PNG
                              avec l'outil de lecture d'images (Read) et REGARDE la planche.
- encadre.js --x X --y Y --max LARGEUR [--danger] "texte"
                              compose un encadre dont la boite est construite autour du
                              texte, meme marge des quatre cotes. Jamais d'encadre a l'oeil.`

const REGLES = `Les regles qui ont fait echouer des planches, et que JP a relevees de ses yeux :
- **L'encadre croche** : 18 de marge a gauche, 48 ou 122 a droite ; 16 en haut, 4 en bas.
  Remede : scripts/encadre.js, toujours. Jamais une boite tracee puis un texte pose dedans.
- **Les barres qui depassent** : des hachures tracees ligne par ligne, qui sortent du
  contour. Remede : une hachure est un <pattern> pose en fill de LA FORME QUI DESSINE LE
  CONTOUR. C'est cette forme qui la decoupe, elle ne peut plus sortir.
- **La legende tassee** : plusieurs renvois sur une ligne avec des points medians. Remede :
  une ligne par renvoi, six au maximum, cinq ou six mots chacun.
- **Le dessin tasse dans un coin** d'une page a moitie vide, un element isole au loin.
- **Ce qu'on ne reconnait pas** : des rectangles et des traits qui ne disent aucun objet.
- **Ce qui se dit avec des mots** n'a rien a faire sur le dessin. Etiquette posee sur le
  dessin, element qui redit une phrase du chapitre : ca sort.
- **Jamais de bloc <style>** : chaque forme porte ses attributs, sinon la planche s'ouvre blanche.
- **Aucun chiffre invente.** Chaque nombre vient du chapitre.
Gabarit : pleine page 680x826, demi-page 680x413, quart de page 340x413. Le format suit le contenu.`

const SCHEMA_DESSIN = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    format: { type: 'string' },
    rendus: { type: 'number', description: 'combien de fois tu as rendu et regarde la planche' },
    ceQueJeVoisSansLegende: { type: 'string' },
    corrections: { type: 'array', items: { type: 'string' } },
    verificateur: { type: 'string', description: 'la sortie finale du verificateur' },
    phrasesPourLeChapitre: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'format', 'rendus', 'ceQueJeVoisSansLegende', 'corrections', 'verificateur'],
}

const SCHEMA_REVUE = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['acceptee', 'refusee'] },
    ceQueJeVoisSansLegende: { type: 'string' },
    defauts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gravite: { type: 'string', enum: ['bloquant', 'visible', 'finition'] },
          ou: { type: 'string', description: 'ou sur la planche, en coordonnees ou en description precise' },
          defaut: { type: 'string' },
          correction: { type: 'string', description: 'ce qu il faut faire, concretement' },
        },
        required: ['gravite', 'ou', 'defaut', 'correction'],
      },
    },
  },
  required: ['verdict', 'ceQueJeVoisSansLegende', 'defauts'],
}

phase('Dessin')
log(`${P.length} planches. Chacune est dessinee, rendue et regardee, puis relue par un directeur artistique independant.`)

const results = await pipeline(
  P,
  // 1. le dessinateur
  (p) => agent(
    `Tu reprends UNE planche du "Grand Livre du Chalet". CLAUDE.md t'est deja injecte.

=== LIS LE SKILL, IL A BEAUCOUP CHANGE ===
.claude/skills/planches/SKILL.md en entier, puis references/svg-technique.md.

${OUTILS}

${REGLES}

=== TA PLANCHE ===
${p.ref} — ${p.nom}
Fichier : ${p.fichier}
Chapitre source : chapitres/${p.src}

=== CE QUE JP EN A DIT ===
${p.verdict}

=== CE QUE TU FAIS ===
${p.consigne}

=== LA BOUCLE, OBLIGATOIRE ===
1. Lis le fichier actuel et le chapitre source.
2. Rends la planche actuelle et REGARDE-LA avant de toucher a quoi que ce soit.
3. Corrige.
4. Verifie : tout DUR se corrige.
5. Rends et regarde a nouveau. Demande-toi : sans lire la legende, qu'est-ce que je vois ?
   La composition occupe-t-elle la page ? Un bord deborde-t-il ? Un encadre a-t-il l'air vide
   d'un cote ? La legende ressemble-t-elle a un paragraphe ?
6. Recommence 3 a 5 jusqu'a ce que tu n'aies plus rien a reprocher. Au moins deux rendus.

Tu n'ecris QUE ton fichier.`,
    { label: `dessin ${p.ref}`, phase: 'Dessin', schema: SCHEMA_DESSIN }
  ),
  // 2. le directeur artistique
  (d, p) => agent(
    `Tu es DIRECTEUR ARTISTIQUE pour "Le Grand Livre du Chalet", un manuel de survie imprime
en noir et blanc, 8 x 10 po. Tu n'as pas dessine cette planche. Tu ne la redessines pas.
Ton travail est de la REFUSER s'il y a quoi que ce soit qu'un illustrateur technique
professionnel refuserait.

Planche : ${p.ref} — ${p.nom}
Fichier : ${p.fichier}

Lis .claude/skills/planches/SKILL.md pour les regles du livre.

${OUTILS}

${REGLES}

=== CE QUE TU FAIS ===
1. Rends la planche : node .claude/skills/planches/scripts/rendre-planche.js ${p.fichier}
2. Ouvre le PNG avec l'outil de lecture d'images et regarde-la.
3. Couvre mentalement la legende. Ecris ce que tu vois — des objets nommes, ou « des
   rectangles et des traits ». Si c'est le second, la planche est refusee.
4. Passe le verificateur, mais ne t'y fie pas : il a declare « rien a redire » sur une
   planche qui avait trois defauts visibles au premier coup d'oeil.
5. Liste CHAQUE defaut, avec ou il est et comment le corriger concretement.
6. Applique aussi le test de la phrase a chaque element dessine : s'il redit une phrase du
   chapitre, c'est un defaut.

Ce que JP a dit de cette planche : ${p.verdict}
Si un de ses reproches est encore visible, c'est un defaut bloquant.

Verdict « acceptee » seulement si tu n'as rien de gravite bloquant ou visible. Sois dur :
ce livre a deja eu quatre planches refusees par JP pour des defauts qu'un agent avait laisses
passer. Tu es la derniere porte avant lui.`,
    { label: `revue ${p.ref}`, phase: 'Relecture', schema: SCHEMA_REVUE }
  ).then(r => ({ dessin: d, revue: r })),
  // 3. correction si refusee
  (x, p) => {
    if (!x || !x.revue) return x
    const aCorriger = (x.revue.defauts || []).filter(d => d.gravite !== 'finition' || x.revue.verdict === 'refusee')
    if (x.revue.verdict === 'acceptee' && aCorriger.length === 0) return { ...x, correction: null }
    const liste = (x.revue.defauts || []).map((d, i) => `${i + 1}. [${d.gravite}] ${d.ou} — ${d.defaut}\n   Correction : ${d.correction}`).join('\n')
    return agent(
      `Tu corriges UNE planche du "Grand Livre du Chalet" apres la relecture d'un directeur artistique.
CLAUDE.md t'est deja injecte. Lis .claude/skills/planches/SKILL.md.

${OUTILS}

Planche : ${p.ref} — ${p.nom}
Fichier : ${p.fichier}
Chapitre : chapitres/${p.src}

=== CE QUE LE DIRECTEUR ARTISTIQUE A TROUVE ===
Verdict : ${x.revue.verdict}
Ce qu'il voit sans legende : ${x.revue.ceQueJeVoisSansLegende}

${liste}

=== CE QUE TU FAIS ===
Corrige chaque defaut. Pour chacun : corrige, verifie, rends, regarde.
Si tu es en desaccord avec un point, dis-le dans corrections avec ta raison plutot que de
l'appliquer a contrecoeur — mais seulement si tu as une raison qui tient.
Finis par un rendu que tu as regarde et un verificateur sans DUR.

Tu n'ecris QUE ton fichier.`,
      { label: `correction ${p.ref}`, phase: 'Correction', schema: SCHEMA_DESSIN }
    ).then(c => ({ ...x, correction: c }))
  }
)

const ok = results.filter(Boolean).length
log(`${ok}/${P.length} planches reprises`)
return P.map((p, i) => ({ ref: p.ref, r: results[i] || null }))
