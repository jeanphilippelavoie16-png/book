export const meta = {
  name: 'passe-paperasse',
  description: 'Retire la paperasse (registres, carnets, releves), les attributions de source et les notes internes des chapitres',
  phases: [{ title: 'Chapitres', detail: 'un agent par groupe de deux a quatre chapitres' }],
}

const SCHEMA = {
  type: 'object',
  properties: {
    chapitres: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fichier: { type: 'string' },
          coupes: { type: 'array', items: { type: 'string' }, description: 'chaque passage coupe, resume en quelques mots' },
          transformes: { type: 'array', items: { type: 'string' }, description: 'avant -> apres, en quelques mots' },
          attributionsRetirees: { type: 'number' },
          notesInternesDeplacees: { type: 'number' },
          doutes: { type: 'array', items: { type: 'string' }, description: 'ce que tu as garde en hesitant, pour que JP tranche' },
        },
        required: ['fichier', 'coupes', 'transformes', 'attributionsRetirees', 'notesInternesDeplacees', 'doutes'],
      },
    },
  },
  required: ['chapitres'],
}

function prompt(g) {
  return `Tu fais une passe de nettoyage sur ${g.length > 1 ? 'des chapitres' : 'un chapitre'} du « Grand Livre du Chalet », un manuel de survie personnel en français québécois. Le projet est dans C:\\Users\\jeanp\\New folder ; ses règles sont dans CLAUDE.md, déjà dans ton contexte.

**Tes chapitres :** ${g.map(f => '`chapitres/' + f + '`').join(', ')}. Une copie de sauvegarde existe ; ne touche à aucun autre chapitre.

## 1. La paperasse — le cœur de la passe

JP, le lecteur et l'auteur, a jeté le registre du stock et la fiche d'espèce inconnue en disant : **« Qui va vraiment utiliser ça ? C'est pas un magasin de pièces que je run, c'est la fin du monde. Je veux de quoi pour survivre. »** Le livre a pris un pli administratif : « noter au carnet », « tenir un registre », « relevé chaque heure », « la table de rendement qu'on écrit soi-même », « recompter une fois l'an ». Personne ne fait ça, épuisé, dans le bois.

Pour chaque passage où le livre demande d'écrire, de noter, de tenir, d'inscrire, de consigner ou de relever **pour plus tard** :

- **Ça sort** quand c'est de la tenue de livres : registre, carnet, cahier, journal, fiche à remplir, relevé horaire ou quotidien, comptage des entrées et sorties, recomptage, rendement par bête, statistiques « pour la saison prochaine » ou « pour bâtir le barème », signature. Coupe la consigne et ce qui ne sert qu'à elle (la ligne de matériel « cahier », le point de contrôle « noté au registre », le signe d'échec « sortie non notée »).
- **Ça se transforme** quand le fait écrit sert une décision qu'on prendra vraiment plus tard. Il s'écrit alors **sur la chose elle-même**, en une phrase courte : « À CUIRE » et la date au feutre sur le paquet ; la date de mise en saumure sur le seau ; l'heure du garrot sur le front ; l'heure où le courant est tombé sur la porte du congélateur.
- **Ça reste** quand ce n'est pas de la paperasse du tout : **mesurer** au moment où on s'en sert (lire le thermomètre, peser le sel, compter les têtes) fait partie de la procédure. Ne touche pas aux mesures ; seulement à l'écriture pour plus tard.

**Attention, dans l'autre sens.** Le jour où j'ai appliqué une règle de JP au-delà de ce qu'il visait, j'ai coupé des choses qu'il voulait. Tu ne coupes **que** de la tenue de livres. Tout ce qui est procédure, mécanisme, sécurité, débrouille reste. Les neuf rappels de sécurité de CLAUDE.md restent partout. En cas de doute, garde, et mets-le dans « doutes ».

## 2. Les attributions de source

CLAUDE.md : aucune attribution dans le texte du livre. On écrit « 74 °C à cœur », pas « 74 °C à cœur (MAPAQ) », ni « le MAPAQ recommande 74 °C », ni « selon Santé Canada », ni « la page officielle dit ». Retire le nom de l'organisme et garde le fait, en recousant la phrase pour qu'elle se lise bien. Vaut pour MAPAQ, Santé Canada, INSPQ, CNESST, ACIA, Québec.ca, USDA, NCHFP, CDC, SOPFEU et toute autre source. **Garde** un numéro ou un service qu'on appelle vraiment (la ligne de pannes d'Hydro-Québec, le Centre antipoison) : ce n'est pas une attribution, c'est un outil. Garde les marqueurs \`[À VÉRIFIER]\` : ce sont des drapeaux de travail, ils se lèvent avant l'impression.

## 3. Les notes internes

Les notes qui s'adressent au projet et non au lecteur — mentions de \`CLAUDE.md\`, de la « liste de relecture obligatoire », de vérificateurs, d'éditeurs, de fiches de suivi — ne s'impriment pas. Déplace-les, telles quelles, à la fin de \`suivi/NN-redaction.md\`, sous « Notes retirées du chapitre — 23 septembre 2026 », et retire-les du chapitre.

## Comment travailler

Lis chaque chapitre une fois, en entier. Repère tout, puis corrige avec Edit, sans relire le fichier entier après chaque retouche. Garde le gabarit en neuf sections et le ton du livre : direct, dense, sans tutoiement du lecteur. N'ajoute aucun chiffre. Chaque tour relit tout ton contexte : sois économe.

Réponds, chapitre par chapitre : ce qui est coupé, ce qui est transformé (avant → après), le nombre d'attributions retirées et de notes déplacées, et tes doutes.`
}

return await parallel(args.map(g => () =>
  agent(prompt(g), { label: `paperasse ${g.map(f => f.slice(0, 3).replace('-', '')).join(' ')}`, phase: 'Chapitres', schema: SCHEMA })
    .catch(e => ({ erreur: String(e), groupe: g }))
))
