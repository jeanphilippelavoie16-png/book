export const meta = {
  name: 'planches-dix-premieres',
  description: 'Dessine dix planches du Grand Livre du Chalet avec le skill planches, une par agent, couvrant les cinq types',
  phases: [
    { title: 'Planches', detail: 'un agent par planche : lire le chapitre, choisir la forme, dessiner, verifier' },
  ],
}

const P = args

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    typeRetenu: { type: 'string', description: 'montage, coupe, carte de distances, sequence ou gabarit' },
    format: { type: 'string', description: 'pleine page, demi-page ou quart de page' },
    ceQueLaPlancheMontre: { type: 'string', description: 'le mecanisme du chapitre que la planche rend visible, en une ou deux phrases' },
    renvois: { type: 'array', items: { type: 'string' }, description: 'la legende, un element par renvoi numerote' },
    echelle: { type: 'string', description: 'la cote ou l objet connu qui donne la taille' },
    chiffresUtilises: { type: 'array', items: { type: 'string' }, description: 'chaque nombre porte sur la planche, avec sa provenance dans le chapitre' },
    verificateur: { type: 'string', description: 'la sortie du script de verification' },
    droitDeDessiner: { type: 'string', description: 'pourquoi ce sujet est dessinable : geometrie, logique ou convention' },
    decisionsPourJP: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'typeRetenu', 'format', 'ceQueLaPlancheMontre', 'renvois', 'echelle', 'chiffresUtilises', 'droitDeDessiner'],
}

phase('Planches')
log(`${P.length} planches, une par agent. Les cinq types du skill sont couverts.`)

const results = await parallel(
  P.map(p => () =>
    agent(
      `Tu dessines UNE planche du "Grand Livre du Chalet". CLAUDE.md t'est deja injecte.

=== LIS LE SKILL AVANT TOUT ===
Le projet a un skill dedie. Lis-le en entier avant de toucher a quoi que ce soit :
  .claude/skills/planches/SKILL.md
Puis la reference du type que tu retiens :
  .claude/skills/planches/references/types-de-planches.md
Et la mecanique SVG, qui contient des pieges qui ne se voient pas a l'ecran :
  .claude/skills/planches/references/svg-technique.md

Un exemple fini et valide est dans images/planche-84-09-soudage-batteries.svg. Regarde-le
pour le niveau de finition attendu : hierarchie des traits, renvois numerotes dans l'ordre
du geste, une seule cote, encadre danger en filet rouge, pied de planche.

=== TA PLANCHE ===
Chapitre ${p.ch} — ${p.titre}
Sujet : ${p.sujet}
Type pressenti : ${p.type}   (tu peux en changer si la lecture du chapitre te donne raison)
Fichier a ecrire : ${p.fichier}

=== LA METHODE ===
1. **Lis le chapitre** chapitres/${p.src} en entier. Pas seulement le passage : la planche
   doit rendre visible un MECANISME du texte, et tu ne sais lequel qu'en ayant lu.
   Lis aussi sa fiche suivi/${p.ch}-redaction.md si elle existe.
2. **Tranche : as-tu le droit de dessiner ca ?** Le skill donne la regle. Geometrie,
   logique et convention, oui. Observation du reel que tu n'as pas faite — anatomie,
   espece, nervation, lames de champignon — non. Si tu tombes dans le second cas, tu
   n'inventes pas : tu ecris la fiche de commande pour un illustrateur dans le fichier, en
   commentaire, et tu le dis dans decisionsPourJP.
3. **Choisis le type et le format.** Le format plafonne le nombre de renvois.
4. **Pose la composition en coordonnees** avant d'ecrire du SVG.
5. **Dessine.** Attributs de presentation sur chaque forme, JAMAIS de bloc <style> : les
   visualiseurs le retirent et la planche s'ouvre blanche. La table des valeurs est dans
   svg-technique.md.
6. **Verifie** : node .claude/skills/planches/scripts/verifier-planche.js ${p.fichier}
   Corrige tout ce qui sort en DUR. Les tiedes se corrigent aussi sauf raison.
   Recopie la sortie finale dans ton champ verificateur.
7. **Relis en te demandant ce que tu enleves.** Il y a presque toujours quelque chose.

=== CE QUI COMPTE LE PLUS ===
- **Aucun chiffre invente.** Chaque nombre porte sur la planche vient du chapitre. Si le
  chapitre ne donne pas la valeur, tu ne la mets pas — tu cotes autrement, ou tu ne cotes
  pas cette dimension-la. Recense dans chiffresUtilises chaque nombre et d'ou il vient.
  Une planche est plus dangereuse qu'un texte : une cote dessinee a l'air mesuree.
- **Une echelle.** Cote chiffree, objet connu, ou barre d'echelle. Sans ca la planche est
  decorative.
- **La hierarchie des traits.** 2,4 / 1,4 / 0,7 / 0,5. Un dessin ou tout est a la meme
  epaisseur est plat et illisible.
- **Renvois numerotes dans l'ordre du geste**, jamais d'etiquette posee sur le dessin.
- Noir #1A1A1A sur blanc. Le rouge #9B2C1E seulement pour un filet danger, et seulement
  s'il y a un danger reel dans le chapitre.
- Casse de phrase partout. Typographie francaise : espace avant ; : ! ? et ».

Tu n'ecris QUE ton fichier SVG. Un autre agent dessine chacune des neuf autres planches.`,
      { label: `pl ${p.ch} ${p.sujet.slice(0, 34)}`, phase: 'Planches', schema: SCHEMA }
    )
  )
)

const ok = results.filter(Boolean).length
log(`${ok}/${P.length} planches dessinees`)

return P.map((p, i) => {
  const r = results[i]
  if (!r) return { ch: p.ch, sujet: p.sujet, ok: false }
  return { ch: p.ch, sujet: p.sujet, ok: true, ...r }
})
