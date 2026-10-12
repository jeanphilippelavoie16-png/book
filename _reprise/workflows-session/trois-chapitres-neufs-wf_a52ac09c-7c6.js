export const meta = {
  name: 'trois-chapitres-neufs',
  description: 'Ecrit le chapitre principal, le chapitre d achat par priorite, et le chapitre manquant sur les feux de foret',
  phases: [
    { title: 'Chapitres neufs', detail: 'trois agents, trois chapitres qui n existaient pas' },
  ],
}

const CONTEXTE = `Tu travailles sur "Le Grand Livre du Chalet". CLAUDE.md t'est deja injecte et il vient d'etre REECRIT :
lis-le attentivement, il a change sur trois points majeurs.

1. **DEUX LIEUX, pas un.** La maison est au village, sur le reseau (Hydro, aqueduc, egout), avec des voisins
   proches, le rangement et le congelateur. Le chalet est hors reseau, isole, et c'est lui qui porte le
   territoire (chasse, peche, bois, jardin, caveau). La regle de bascule : **ce qui est court se vit a la
   maison, ce qui dure finit au chalet**. Les premiers chapitres du livre se passent a la maison ; le long
   terme est au chalet. Chaque chapitre dit lequel des deux il vise.

2. **AUCUNE SECTION SOURCES.** Elle a ete retiree des 89 chapitres — 104 pages de liens qui ne sauvent
   personne. Le travail de source ne change pas : tu cherches les sources officielles AVANT d'ecrire, tu
   enregistres les pages dans /sources, et la regle 1 tient (aucun chiffre invente, chaque nombre porte sa
   source ou la mention [A VERIFIER]). Mais l'attribution se fait EN TROIS MOTS DANS LE TEXTE — "74 °C
   (MAPAQ)" — et il n'y a plus de liste a la fin. Le gabarit fait maintenant NEUF points.

3. **AUCUNE EVIDENCE.** "Sortir si le batiment brule", "obeir aux autorites qui ordonnent l'evacuation" :
   personne n'apprend rien et ca vole la place du contenu reel. Une ligne reste seulement si un adulte sense
   ne la devinerait pas tout seul.

Les 89 chapitres existants sont dans chapitres/NN-titre-court.md. Le plan maitre est dans plan/plan-maitre.md,
le glossaire dans plan/glossaire.md (vocabulaire et noms latins arbitres : respecte-les). Les fiches de chaque
chapitre sont dans suivi/NN-redaction.md.

LECTEUR : JP, sa conjointe, deux enfants de 4 et 6 ans. Il sait souder, cabler du 12 V et abattre un orignal.
Il n'a jamais sale une cuisse ni tanne une peau. Francais quebecois, ton direct, pas de tutoiement du lecteur.
Ecris dense : une phrase qui n'apprend rien saute.`

const TACHES = [
  {
    id: 'principal',
    label: 'le chapitre principal',
    out: 'chapitres/00-le-chapitre-principal.md',
    prompt: `Ecris LE CHAPITRE PRINCIPAL, dans chapitres/00-le-chapitre-principal.md.

C'est le chapitre qui OUVRE le livre. Il ne suit PAS le gabarit en neuf points : il a sa propre forme,
parce qu'il a son propre travail.

=== A QUOI IL SERT ===
C'est la page qu'on ouvre en panique, a la lampe frontale, avec un enfant qui pleure dans l'autre piece.
Il doit tenir SANS avoir ete lu d'avance. Quelqu'un qui ne connait pas le livre doit pouvoir s'en servir
dans les trente secondes qui suivent.

=== SA FORME ===
Les catastrophes les plus probables, **classees par probabilite reelle et non par ce qui fait peur**.
Pour chacune : quelques points majeurs, gros, courts, a l'imperatif ou a l'infinitif, et rien d'autre.
Chaque point renvoie au chapitre qui developpe.

Le classement est la partie difficile et c'est elle qui fait la valeur du chapitre. CHERCHE les donnees
reelles avant de classer : frequence des pannes majeures d'Hydro-Quebec, statistiques de feux de foret de
la SOPFEU pour la Cote-Nord, incendies residentiels, delais des services d'urgence en region eloignee,
tempetes et verglas. Une panne de courant en janvier n'a pas la meme probabilite qu'une retombee
radioactive, et le livre doit le dire par son ordre.

Pour CHAQUE catastrophe, dis aussi **ou elle te trouve** : a la maison ou au chalet. Un feu de foret
menace les deux. Une panne d'Hydro frappe la maison. Un accident de scie a chaine arrive au chalet.

=== CE QUI DOIT Y ETRE ===
- Les trois ou quatre gestes qui changent l'issue, pour chaque catastrophe. Pas dix.
- Le seuil de decision : a partir de quand ca cesse d'etre court et devient long, donc a partir de quand
  on pense a partir au chalet. Renvoie au chapitre 2 (Rester ou partir), qui est la charniere du livre.
- Les avertissements de securite qui tuent le plus vite, et seulement ceux-la : le monoxyde de carbone,
  parce qu'il n'a ni odeur ni couleur et qu'on s'endort au lieu de sortir ; la generatrice jamais dans un
  batiment ni sous un auvent ; le botulisme qui ne change ni l'odeur ni le gout.
- AUCUNE evidence. Si un point se devine tout seul, il saute.

Va lire les chapitres que tu cites, au moins leurs sections 1 et 8, pour que tes renvois soient justes.
La liste des 89 chapitres est dans plan/plan-maitre.md. Un chapitre 16b sur les feux de foret est en
cours d'ecriture par un autre agent : renvoie-y sous le numero 16b.`,
  },
  {
    id: 'achat',
    label: 'acheter par priorite',
    out: 'chapitres/00b-acheter-par-priorite.md',
    prompt: `Ecris LE CHAPITRE D'ACHAT, dans chapitres/00b-acheter-par-priorite.md.

=== LE PROBLEME QUE TU REGLES ===
Le livre a des inventaires eparpilles sur toutes les pages. Cinq chapitres entiers sont des listes
(8 stock permanent, 9 liste de 72 heures, 10 quand on a un preavis, 11 listes par scenario, 12 ce qui
manque toujours), plus le 85 (stock de pieces), plus le tableau Materiel de chacun des 89 chapitres.
Personne ne sait par quoi commencer.

Desormais **il n'y a qu'un seul inventaire dans le livre, et c'est celui-la.** Le tableau Materiel d'un
chapitre ne garde que ce qu'il faut pour SA procedure. Tout le reste pointe ici.

=== SA FORME ===
Ce chapitre ne suit PAS le gabarit en neuf points. C'est une liste d'achat, classee en QUATRE PALIERS :

1. **A acheter absolument** — sans ca, un scenario probable tourne mal tout de suite. Si le budget
   s'arrete apres ce palier, la famille tient quand meme.
2. **Essentiel** — ce qui fait la difference entre tenir et bien tenir.
3. **Important** — ce qui evite une degradation lente.
4. **S'il reste du temps et de l'argent** — le confort, la redondance, ce qui se bricole autrement.

Chaque ligne porte : l'item, la quantite, **MAISON / CHALET / LES DEUX**, ce qu'on perd si on ne l'a pas,
et le chapitre qui explique comment s'en servir. Un ordre de prix quand tu en trouves un verifiable, sinon
rien — pas de prix invente.

=== COMMENT TU LE CONSTRUIS ===
Va lire les tableaux Materiel (section 4) des 89 chapitres, plus les chapitres 8, 9, 10, 11, 12 et 85 en
entier. Utilise Grep pour cibler : tu ne peux pas tout lire lineairement. Regroupe ce qui revient, dedoublonne,
et classe.

Le classement est un JUGEMENT, et c'est le travail. Un thermometre a sonde a lecture instantanee est au
palier 1 : sans lui, on ne sait pas si le gibier a vu 74 °C, et c'est la regle de securite la plus repetee
du livre. Un detecteur de monoxyde de carbone a pile est au palier 1 : le CO n'a ni odeur ni couleur, et
c'est la seule chose qui previent. Un fumoir est au palier 4 : ca se bricole. Justifie chaque palier 1 en
une ligne — pourquoi celui-la et pas le suivant.

=== LA REGLE DES DEUX LIEUX ===
La maison a le rangement et le congelateur : la reserve de fond vit la. Le chalet garde le minimum plus
tout ce qui touche le territoire. Ce qui est court se vit a la maison, ce qui dure finit au chalet : donc
ce qui sert au long terme doit pouvoir MONTER au chalet, et ca se dit dans la ligne.

Termine par une courte section "Si tu n'achetes qu'une chose ce mois-ci" : un seul item, avec la raison.`,
  },
  {
    id: 'foret',
    label: 'feux de foret',
    out: 'chapitres/16b-feu-de-foret.md',
    prompt: `Ecris le chapitre MANQUANT sur LES FEUX DE FORET, dans chapitres/16b-feu-de-foret.md.

=== POURQUOI IL EXISTE ===
Le livre n'a aucun chapitre sur les feux de foret. Le mot apparait en passant dans dix chapitres, mais le
chapitre 16 (Le feu au chalet) traite du feu de cheminee et du feu de batiment, pas du feu qui arrive par
le bois. En foret boreale sur la Cote-Nord, c'est probablement le trou le plus grave du livre : le feu de
foret y est nettement plus probable que les retombees radioactives, qui ont leur chapitre.

**LES DEUX LIEUX SONT EXPOSES.** La maison au village et le chalet isole. Ce chapitre traite les deux, et
ne se contente pas d'ecrire le chalet en faisant semblant que la maison est a l'abri. Les mecanismes
different : au village on est expose aux braises portees par le vent et a l'evacuation ordonnee ; au chalet
on est expose au front lui-meme, a la fumee, et surtout a l'unique chemin qui peut se couper.

=== CE CHAPITRE SUIT LE GABARIT EN NEUF POINTS ===
Lis gabarit-chapitre.md. Il a CHANGE : neuf points, plus de section Sources, une ligne de lieu avant le
point 1. Ici, la ligne de lieu est **Les deux**.

=== CE QU'IL DOIT PORTER ===
Cherche les sources officielles AVANT d'ecrire : SOPFEU (Societe de protection des forets contre le feu),
Ressources naturelles Canada, FireSmart Canada, Environnement Canada pour la qualite de l'air, la Securite
civile du Quebec, le MELCCFP pour les interdictions de circulation en foret.

Le chapitre doit repondre a ce qu'un grep ne donne pas :
- **Lire le danger avant qu'il arrive.** Indice-o-metre et niveaux de danger d'incendie de la SOPFEU,
  ce qu'ils veulent dire concretement, et a partir de quel niveau on change de comportement.
- **Le declencheur de depart.** C'est le point le plus important du chapitre. Un feu de foret est le
  scenario ou rester est generalement le mauvais choix, a l'inverse de presque tout le reste du livre.
  Dis a quel moment on part, et pourquoi partir tard est pire que partir tot : la fumee ferme la route
  avant le feu, et un seul chemin qui se coupe transforme un depart en piege.
- **La zone defendable.** Ce qui se fait AVANT, autour du batiment : degagement des conifères, du bois de
  chauffage, du propane, des aiguilles dans les gouttieres et sous la galerie. Les braises portees par le
  vent allument plus de batiments que le front lui-meme — donne le mecanisme, pas juste la consigne.
- **La fumee.** Deux enfants de 4 et 6 ans sont le sujet, pas une note de bas de page. Qualite de l'air,
  quand la fumee devient un probleme medical, ce qu'on fait dans une maison sur le reseau (on peut fermer
  et filtrer) contre un chalet qui respire.
- **Si on ne peut pas partir.** La version honnete, sans heroisme, en nommant ce qu'on perd.
- **L'eau.** Pompe, boyau, arrosage : ce qui marche et ce qui est du theatre.
- **Apres.** Retour, eau contaminee, sols instables, arbres qui tombent encore.

=== ENCADRE DANGER ===
Il en faut un, et il donne les MECANISMES, pas des consignes. Piste : la fumee tue avant les flammes ;
la route se coupe par la fumee et non par le feu ; les braises voyagent loin devant le front ; une bonbonne
de propane a cote d'un mur chauffe.

ET la regle du tableau de CLAUDE.md qui s'applique ici et qui se repete : **generatrice jamais dans un
batiment, un garage ou sous un auvent**. Quelqu'un qui revient dans une maison sans courant apres un feu
est exactement le candidat a l'intoxication au monoxyde de carbone.

=== RENVOIS ===
Renvoie au chapitre 2 (Rester ou partir, la charniere), 16 (Le feu au chalet), 10 (Quand on a un preavis),
19 (Communiquer et savoir), 20 (Se deplacer et le carburant), 35 (Lire le territoire). Verifie dans ces
chapitres que l'information que tu annonces s'y trouve vraiment avant de renvoyer.

Marque le relecteur humain requis en tete du fichier : ce chapitre en demande un.`,
  },
]

const SCHEMA = {
  type: 'object',
  properties: {
    fichier: { type: 'string' },
    motsUtiles: { type: 'number' },
    lieu: { type: 'string', description: 'Maison, Chalet ou Les deux' },
    resume: { type: 'string', description: 'ce que le chapitre fait, en 3 a 5 phrases' },
    chiffresAValider: {
      type: 'array',
      items: {
        type: 'object',
        properties: { valeur: { type: 'string' }, contexte: { type: 'string' }, pourquoi: { type: 'string' } },
        required: ['valeur', 'contexte'],
      },
    },
    sourcesEnregistrees: {
      type: 'array',
      items: {
        type: 'object',
        properties: { organisme: { type: 'string' }, url: { type: 'string' }, fichier: { type: 'string' } },
        required: ['organisme', 'url'],
      },
    },
    renvois: {
      type: 'array',
      items: {
        type: 'object',
        properties: { chapitre: { type: 'string' }, raison: { type: 'string' } },
        required: ['chapitre', 'raison'],
      },
    },
    relecteurHumain: { type: 'string' },
    decisionsPourJP: { type: 'array', items: { type: 'string' } },
  },
  required: ['fichier', 'motsUtiles', 'lieu', 'resume', 'chiffresAValider', 'renvois'],
}

phase('Chapitres neufs')
log(`3 chapitres qui n'existaient pas : le principal, celui des achats, celui des feux de foret.`)

const results = await parallel(
  TACHES.map(t => () =>
    agent(`${CONTEXTE}\n\n=== TA MISSION ===\n${t.prompt}\n\nTu ecris ${t.out} avec l'outil Write. Tu ne modifies AUCUN chapitre existant : si tu vois quelque chose a corriger ailleurs, signale-le dans decisionsPourJP.`, {
      label: t.label,
      phase: 'Chapitres neufs',
      schema: SCHEMA,
    })
  )
)

log(`${results.filter(Boolean).length}/${TACHES.length} termines`)

return TACHES.map((t, i) => ({ id: t.id, out: t.out, r: results[i] || null }))
