export const meta = {
  name: 'quatre-formulaires',
  description: 'Compose les quatre formulaires restants en PDF 8x10 avec le skill formulaires, puis relecture independante',
  phases: [
    { title: 'Composition', detail: 'lire le chapitre, ecrire la description, composer, regarder l apercu' },
    { title: 'Relecture', detail: 'un relecteur independant regarde le PDF et le refuse s il a l air amateur' },
    { title: 'Correction', detail: 'corriger ce que la relecture a trouve' },
  ],
}

const F = args

const SCHEMA_C = {
  type: 'object',
  properties: {
    ref: { type: 'string' },
    estUnFormulaire: { type: 'boolean', description: 'faux si, apres lecture du chapitre, ce n est pas une feuille qu on remplit a la main' },
    pourquoi: { type: 'string' },
    pdf: { type: 'string' },
    pages: { type: 'number' },
    champsEtLeurSource: { type: 'array', items: { type: 'string' }, description: 'chaque champ, et la phrase du chapitre qui le demande' },
    apercusRegardes: { type: 'number' },
    corrections: { type: 'array', items: { type: 'string' } },
  },
  required: ['ref', 'estUnFormulaire', 'pourquoi'],
}

const SCHEMA_R = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['accepte', 'refuse'] },
    defauts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gravite: { type: 'string', enum: ['bloquant', 'visible', 'finition'] },
          defaut: { type: 'string' },
          correction: { type: 'string' },
        },
        required: ['gravite', 'defaut', 'correction'],
      },
    },
  },
  required: ['verdict', 'defauts'],
}

phase('Composition')
log(`${F.length} formulaires. Modele de reference : images/formulaires/01-01 (json, pdf, png).`)

const results = await pipeline(
  F,
  (f) => agent(
    `Tu composes UN formulaire du "Grand Livre du Chalet". CLAUDE.md t'est deja injecte.

=== LIS LE SKILL ===
.claude/skills/formulaires/SKILL.md en entier. Puis l'en-tete de
.claude/skills/formulaires/scripts/composer-formulaire.js, qui donne le format de la description
et les types de blocs.

=== LE MODELE ===
La fiche 01-01 est faite et JP l'a vue : images/formulaires/01-01.json, et son apercu
images/formulaires/01-01.png. Ouvre ce PNG et regarde-le : c'est le niveau attendu. Meme
mise en page, meme ton, meme sobriete.

=== TON FORMULAIRE ===
${f.ref} — ${f.nom}
Chapitre source : chapitres/${f.src}
Ce qu'on en sait : ${f.note}

=== D'ABORD : EST-CE BIEN UN FORMULAIRE ? ===
Lis le chapitre. Un formulaire, c'est une feuille qu'on IMPRIME et qu'on REMPLIT A LA MAIN.
Si ce que le chapitre decrit est en fait un mode de lecture, une explication, ou quelque
chose qui ne se remplit pas au crayon, ce n'est pas un formulaire : reponds
estUnFormulaire = faux, dis pourquoi, et ne compose rien.

=== ENSUITE ===
1. Releve chaque champ que le chapitre demande de noter, avec la phrase qui le demande.
   Un champ sans phrase du chapitre derriere n'a rien a faire sur la feuille.
2. Ecris images/formulaires/${f.ref}.json.
3. Compose : node .claude/skills/formulaires/scripts/composer-formulaire.js images/formulaires/${f.ref}.json
4. Ouvre l'apercu PNG avec l'outil de lecture d'images. Regarde-le a cote de 01-01.png.
5. Il doit tenir sur UNE page (le script le dit), remplir la page sans pouce vide en bas,
   avoir une rangee d'en-tetes egale, et ne laisser aucun mot seul sur une ligne.
6. Corrige, recompose, regarde. Au moins deux apercus regardes.

Pas de renvois numerotes, pas de dessin, pas d'encadre, pas d'exemple pre-rempli, pas de
champ « signature ». Pas d'attribution de source. Tu n'ecris QUE ton .json (le script ecrit
le reste).`,
    { label: `form ${f.ref}`, phase: 'Composition', schema: SCHEMA_C }
  ),
  (c, f) => {
    if (!c || !c.estUnFormulaire) return { composition: c, revue: null }
    return agent(
      `Tu relis un formulaire du "Grand Livre du Chalet". Tu ne l'as pas compose. Tu ne le refais
pas : tu le REFUSES s'il a l'air amateur par quelque cote que ce soit.

Formulaire : ${f.ref} — ${f.nom}
Apercu : images/formulaires/${f.ref}.png
Description : images/formulaires/${f.ref}.json
Chapitre : chapitres/${f.src}

Lis .claude/skills/formulaires/SKILL.md. Ouvre images/formulaires/01-01.png : c'est le modele,
deja vu par JP. Puis ouvre l'apercu de ce formulaire-ci et compare.

JP a refuse la premiere version de la fiche 01-01 en disant « ca c'est pas professionnel » :
elle avait des renvois numerotes vers les cases, un crayon dessine, un encadre. Tout ce qui
ressemble a ca est bloquant.

Ce que tu cherches : une page qui deborde ou qui reste a moitie vide ; une rangee d'en-tetes
inegale ; un en-tete qui ne dit pas quoi ecrire ou en quelle unite ; des lignes trop serrees
pour la main ; un mot seul sur sa ligne ; un champ qui ne vient pas du chapitre ; un champ
que le chapitre demande et qui manque ; une incoherence avec 01-01.

Verifie aussi, dans le chapitre, que chaque champ correspond a quelque chose que le chapitre
demande vraiment de noter.

Verdict « accepte » seulement sans rien de bloquant ni de visible.`,
      { label: `revue ${f.ref}`, phase: 'Relecture', schema: SCHEMA_R }
    ).then(r => ({ composition: c, revue: r }))
  },
  (x, f) => {
    if (!x || !x.revue || x.revue.verdict === 'accepte') return x
    const liste = x.revue.defauts.map((d, i) => `${i + 1}. [${d.gravite}] ${d.defaut}\n   → ${d.correction}`).join('\n')
    return agent(
      `Tu corriges un formulaire du "Grand Livre du Chalet" apres relecture.
Lis .claude/skills/formulaires/SKILL.md.

Formulaire : ${f.ref} — ${f.nom}
Description : images/formulaires/${f.ref}.json
Chapitre : chapitres/${f.src}

=== CE QUE LE RELECTEUR A TROUVE ===
${liste}

Corrige dans le .json (ou, si c'est un defaut de mise en page commun a tous les formulaires,
signale-le dans corrections sans toucher au script : un autre formulaire depend du meme
script). Recompose, ouvre l'apercu, regarde. Finis sur un apercu que tu as regarde et une
seule page.`,
      { label: `corr ${f.ref}`, phase: 'Correction', schema: SCHEMA_C }
    ).then(c => ({ ...x, correction: c }))
  }
)

log(`${results.filter(Boolean).length}/${F.length} formulaires traites`)
return F.map((f, i) => ({ ref: f.ref, r: results[i] || null }))
