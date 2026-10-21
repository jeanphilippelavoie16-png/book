export const meta = {
  name: 'dos-tome',
  description: 'Des éléments de l image du devant dans les trous du dos d une couverture, sans toucher au texte',
  phases: [{ title: 'Dessiner', detail: 'un motif de dos par tome' }],
}
const DIR = '/tmp/claude-0/-home-user-book/80bb7558-6215-51c7-adfd-516cb7afea55/scratchpad/dos'
const IDEES = {
  2: `l'intérieur au mur sang de bœuf : la lampe, les bocaux décorés (une fougère, des pois), le bouquet de plantes qui sèche, la vapeur qui monte, le cadre au mur, le plancher de planches.`,
  3: `le lac au coucher du soleil : le ciel vert forêt très foncé et ses longues entailles crème horizontales près de l'horizon, le reflet en tirets orange, le canot, les épinettes, le lièvre sur la grève.`,
  4: `le lac l'été, le séchoir à poissons, le feu, les épinettes, le ciel bleu-vert avec quelques petites étoiles.`,
  5: `le chalet, le jardin et la forêt l'été, le ciel brun avec des bancs de nuages taillés à la gouge en orange, le soleil.`,
  6: `l'atelier la nuit, la neige, le ciel noir et la lune en haut à droite, les épinettes enneigées.`,
}
const out = []
for (const t of args) {
  out.push(await agent(`Contexte : Le Manuel du Nord (repo /home/user/book). Lis d'abord au complet
/home/user/book/.claude/cadre-agents.md et rends à la fin sa liste de contrôle, cochée pour ce qui s'applique.

Les couvertures des six tomes sont en mise en page C (« le ciel fait le tour ») : le ciel de l'image du devant
(/home/user/book/images/tomes/titre-tome-N.jpg) est reflété en miroir sur la tranche et la quatrième. Au tome 1, ce
ciel est étoilé : on retrouve au dos les étoiles du devant. JP, 19 octobre 2026 : « j'aime que pour le tome 1 on
retrouve des éléments de la couverture en arrière (les étoiles), fais-le pour les autres » ; puis : « mets-en dans les
trous sur la page en arrière, faut juste pas que ça touche au texte ». Aux tomes 2 à 6, le dos est un aplat.

Ta tâche : le tome ${t}. Regarde d'abord à l'image (Read) /home/user/book/images/tomes/titre-tome-${t}.jpg, la
couverture actuelle /home/user/book/images/tomes/couvertures/couverture-tome-${t}-C.png et celle du tome 1
(couverture-tome-1-C.png), en entier et en gros plan sur le dos. Ce que montre l'image du tome ${t} : ${IDEES[t]}
Repère les trous du dos (les grandes zones vides entre les blocs de texte, autour des titres, au-dessus et au-dessous
du sommaire, la marge, la tranche hors de son texte) et mets-y des éléments de l'image du devant, dans son style exact
(mêmes encres, même trait de gravure) : on doit retrouver l'image au dos d'un coup d'œil. Un élément peut être grand
s'il tient dans un trou. Rien ne touche le texte, les filets, les photos ou la barre des tomes : garde une marge nette
autour de chaque boîte de texte. Choisis ce qui est le plus beau, pas le plus chargé.

Le script : /home/user/book/images/tomes/essais-ia/tome-1/couverture.py (lis motif_dos et composer). Écris
/home/user/book/images/tomes/essais-ia/tome-${t}/dos.py avec une fonction motif(can, info) qui dessine sur le fond de
la quatrième et de la tranche (numpy RVB, colonnes 0 à info['xf'] ; la tranche commence à info['xt']) et rend le fond ;
info['rects'] donne les boîtes du texte en px CSS (1 px CSS = info['ppp'] / 96 px du fond) : sers-t'en pour trouver
les trous et pour ne jamais toucher le texte. Rien ne déborde sur le devant. Rien qui fait IA ou clip-art, rien de
flou ; dessine à double taille puis réduis, ou découpe des éléments de l'image du devant elle-même si c'est plus beau.
Rends la couverture avec : python3 /home/user/book/images/tomes/essais-ia/tome-1/couverture.py --tome ${t} --variantes C
--sortie ${DIR}/t${t} (jamais dans images/tomes/couvertures). Regarde le résultat à l'image, en entier et en gros plan
sur le dos à la taille d'impression ; corrige jusqu'à ce que ce soit beau et que le texte soit aussi lisible qu'avant.
Ne touche à aucun autre fichier du repo que ton dos.py ; ne commite rien.
Rends : le chemin de dos.py, le PNG de la couverture, ce que tu as mis au dos et où, et la liste de contrôle.`, {
    label: `dos tome ${t}`, phase: 'Dessiner',
    schema: { type: 'object', properties: { script: { type: 'string' }, png: { type: 'string' }, notes: { type: 'string' }, liste: { type: 'string' } },
      required: ['script', 'png', 'notes', 'liste'] } }).then(r => r ? { ...r, t } : null))
}
return out.filter(Boolean)
