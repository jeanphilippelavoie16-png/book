export const meta = {
  name: 'planche-de-style',
  description: 'Une planche de style du livre : couvertures nordiques, palette, typographie, pages interieures du manuel de terrain, notes de bas de page, planche en page',
  phases: [{ title: 'Design', detail: 'un directeur artistique' }],
}
const S = { type: 'object', properties: { planche: { type: 'string' }, pdf: { type: 'string' }, apercus: { type: 'array', items: { type: 'string' } }, notesDeBasDePage: { type: 'string', description: 'comment la pagination les gere maintenant' }, faiblesses: { type: 'array', items: { type: 'string' } } }, required: ['planche', 'apercus', 'notesDeBasDePage', 'faiblesses'] }

return await agent(`Tu es directeur artistique pour « Le Grand Livre du Chalet », un livre imprimé de survie pour une famille de la Côte-Nord (Blurb, 8 × 10 po). Projet : C:\\Users\\jeanp\\New folder. CLAUDE.md est dans ton contexte.

**Ce qui est décidé** (lis \`design/choix.md\`) : l'intérieur de la direction 1, Manuel de terrain (\`design/directions/1-manuel-de-terrain/\`, son \`interieur.html\`, ses outils \`outils/\` et sa \`note.md\`), et les couvertures de la même direction aux couleurs nordiques (\`couvertures-nordique.html\`) : neige, sang de gibier, épinette, fleuve. Intérieur en noir sur blanc, un seul rouge #9B2C1E réservé au danger.

**JP veut une planche de style** — « une palette pour voir le design du livre avec ce qu'on a parlé ». Fais-la dans \`design/planche-de-style/\` : une grande planche (HTML → PNG et PDF) qui montre d'un coup d'œil tout le système :
1. **Les couvertures** : les quatre avants, la série de tranches sur la tablette, la couverture complète d'un tome.
2. **La palette** : les quatre couleurs de tome avec leur encre, le noir du texte, le rouge du danger, et ce que chacune a le droit de faire.
3. **La typographie** : IBM Plex Sans Condensed et IBM Plex Serif, chaque niveau (titre de chapitre, carré de section, intertitre, texte courant 9,5/13, tableau, légende, note de bas de page, titre courant, folio) avec sa taille.
4. **La grille** : la page 8 × 10, le fond perdu, la zone utile de 7 × 8,5 po, les deux colonnes, la marge de reliure.
5. **Des pages intérieures réelles**, rendues par le vrai moteur de la direction 1 et non refaites à la main : l'ouverture d'un chapitre avec sa ligne de lieu, une page avec le tableau Matériel, une page de procédure, l'encadré danger, le bandeau de la variante d'urgence, **une planche en pleine page** (prends une planche validée de \`images/validees/\`, par exemple la 65-01 corrigée avec la tôle sur le trou à feu), et la page du chapitre principal.
6. **Les notes de bas de page** : c'est nouveau. CLAUDE.md dit maintenant qu'un signe nommé s'explique en note de bas de page (\`[^1]\` en Markdown), et une passe est en train d'en ajouter dans tous les chapitres. **Ajoute leur prise en charge au moteur de pagination de la direction 1** (la note tombe au pied de la colonne ou de la page où son appel apparaît, en corps plus petit, avec un filet court au-dessus, numérotée par chapitre) et montre une page qui en porte une. Si un chapitre en a déjà (cherche \`[^\` dans chapitres/), prends-le ; sinon prends un passage qui nomme un signe et fais-en une démonstration.

Regarde chaque rendu avec Read et corrige ce que tu vois. Pas d'ornement qui ne sert pas. Ne modifie ni les chapitres, ni les planches, ni \`couvertures-nordique.html\` au-delà d'une correction évidente. Travaille économiquement.`, { label: 'planche de style', phase: 'Design', schema: S })
