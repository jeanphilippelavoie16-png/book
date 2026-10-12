export const meta = {
  name: 'savoirs-autochtones',
  description: 'Trois chercheurs sur les savoirs et techniques des Innus et des peuples du Nord, puis une synthese : chapitres et planches a ajouter au Grand Livre',
  phases: [
    { title: 'Recherche', detail: 'trois chercheurs, un bloc chacun' },
    { title: 'Synthese', detail: 'comparaison avec les 89 chapitres, chapitres et planches nouveaux' },
  ],
}

const SCHEMA_R = {
  type: 'object',
  properties: {
    savoirs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sujet: { type: 'string' },
          peuple: { type: 'string', description: 'Innu, Naskapi, Cri, Atikamekw, Inuit... selon la source' },
          ceQueCestEtCommentCaSeFait: { type: 'string', description: 'en tes mots, assez precis pour qu un homme habile le refasse' },
          materiaux: { type: 'string', description: 'ce qu on trouve sur la Cote-Nord' },
          planche: { type: 'string', description: 'si ca merite une planche : quoi dessiner, ou vide' },
          sources: { type: 'array', items: { type: 'string' } },
        },
        required: ['sujet', 'peuple', 'ceQueCestEtCommentCaSeFait', 'materiaux', 'planche', 'sources'],
      },
    },
    precautions: { type: 'array', items: { type: 'string' }, description: 'ce qui est sacre, ce qui ne se reproduit pas, ce qui demande la permission' },
  },
  required: ['savoirs', 'precautions'],
}

const SCHEMA_S = {
  type: 'object',
  properties: {
    rapport: { type: 'string' },
    nouveauxChapitres: { type: 'array', items: { type: 'string' } },
    nouvellesPlanches: { type: 'array', items: { type: 'string' } },
    resume: { type: 'string' },
  },
  required: ['rapport', 'nouveauxChapitres', 'nouvellesPlanches', 'resume'],
}

const BASE = `Tu cherches des savoirs et des techniques des peuples autochtones du Nord québécois — d'abord les **Innus** (le Nitassinan couvre la Côte-Nord), puis les Naskapis, les Cris, les Atikamekw et les Inuits quand c'est pertinent — pour « Le Grand Livre du Chalet », un manuel de survie et d'autonomie pour une famille de la Côte-Nord : forêt boréale, hivers à -35 °C, chasse, pêche, trappe, un chalet hors réseau. Le projet est dans C:\\Users\\jeanp\\New folder ; CLAUDE.md, dans ton contexte, dit l'esprit du livre : la débrouille quand on n'a rien, avec ce qu'on trouve sur place.

Ces peuples vivent sur ce territoire depuis des millénaires, avec ce qu'il donne. C'est la meilleure source qui existe pour ce livre-là.

**Où chercher.** Charge WebSearch et WebFetch avec ToolSearch (« select:WebSearch,WebFetch »). Des sources qui méritent confiance : Institut Tshakapesh, musées (Musée McCord Stewart, Musée canadien de l'histoire, Musée de la civilisation), l'Encyclopédie canadienne, les conseils de bande et organismes innus, les publications universitaires et gouvernementales, les récits et guides écrits par des membres de ces nations. Pas de blogues de survivalisme qui recopient sans comprendre.

**Pour chaque savoir :** ce que c'est et comment ça se fait, dans tes mots, assez précis pour qu'un homme habile de ses mains le refasse ; avec quoi, sur la Côte-Nord ; si ça mérite une planche (une chose qu'on fabrique ou un geste qu'on fait) et quoi y dessiner ; et les pages où tu l'as trouvé.

**Respect.** Ne prends que des techniques et des savoirs pratiques que ces nations partagent publiquement. Ce qui est sacré, cérémoniel ou protégé ne va pas dans un manuel : note-le dans les précautions, sans le décrire. Aucune plante médicinale n'est recommandée sur la foi d'une page web : note-la, le livre a sa propre règle de vérification. Travaille économiquement.`

const BLOCS = [
  { nom: 'se deplacer et s abriter', texte: `**Ton bloc :** se déplacer et s'abriter l'hiver — raquettes (fût, babichage, les formes selon la neige), traîne ou toboggan de bois fendu, tente d'hiver (shaputuan, tente de toile avec poêle, plancher de sapinage), abris de fortune, canot d'écorce et réparations, orientation et lecture du territoire.` },
  { nom: 'prelever et outiller', texte: `**Ton bloc :** prélever et s'outiller — pièges et collets, assommoirs, harpons et nigogs, filets et pêche sous la glace, arcs, outils d'os, de bois et de pierre, colle de gomme d'épinette, babiche, contenants d'écorce de bouleau (paniers cousus à la racine d'épinette), couteau croche, et le travail des peaux.` },
  { nom: 'vivres soins et partage', texte: `**Ton bloc :** vivres, soins et vie collective — séchage et fumage de la viande et du poisson, graisse et moelle, pemmican, la façon de ne rien perdre d'une bête, les plantes alimentaires (sans recommander de plante médicinale), la lecture des saisons et le calendrier des ressources, le partage de la viande et l'entraide qui font tenir un groupe l'hiver.` },
]

const recherches = await parallel(BLOCS.map(b => () =>
  agent(BASE + '\n\n' + b.texte, { label: `savoirs autochtones : ${b.nom}`, phase: 'Recherche', schema: SCHEMA_R })
    .then(r => ({ bloc: b.nom, ...r }))
    .catch(e => ({ bloc: b.nom, erreur: String(e), savoirs: [] }))
))

const synthese = await agent(`Trois chercheurs ont relevé des savoirs et des techniques autochtones du Nord québécois pour « Le Grand Livre du Chalet ». Le projet est dans C:\\Users\\jeanp\\New folder ; CLAUDE.md est dans ton contexte.

Voici leur travail :
${JSON.stringify(recherches, null, 1)}

**Ta tâche :** comparer au Grand Livre tel qu'il est. Lis \`plan/plan-maitre.md\`, la liste des fichiers de \`chapitres/\` et \`images/plan-planches.md\` (les 56 planches prévues). Vérifie avec Grep si un sujet est déjà traité avant de le déclarer nouveau. Puis écris \`suivi/idees-savoirs-autochtones.md\` :
1. **Les chapitres nouveaux** que ça justifie — titre, tome, ce qu'ils couvrent en trois lignes, les planches qu'ils porteraient.
2. **Ce qui complète un chapitre existant** — quel chapitre, quoi ajouter.
3. **Les planches nouvelles** — une ligne par planche : quoi dessiner, dans quel chapitre, et pourquoi c'est une chose qu'on fabrique ou un geste qu'on fait.
4. **Les précautions** : ce qui ne va pas dans le livre, et comment nommer l'origine d'une technique avec respect sans en faire une attribution de source.
Le rapport se lit en cinq minutes.`,
  { label: 'synthese savoirs autochtones', phase: 'Synthese', schema: SCHEMA_S })

return { synthese, recherches: recherches.map(r => ({ bloc: r.bloc, n: (r.savoirs || []).length, erreur: r.erreur })) }
