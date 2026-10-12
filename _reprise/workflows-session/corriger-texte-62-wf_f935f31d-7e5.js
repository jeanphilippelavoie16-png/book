export const meta = {
  name: 'corriger-texte-62',
  description: "Aligne le texte du ch. 62 (et le 64 si besoin) sur la documentation a la source des planches de la carcasse",
  phases: [{ title: 'Texte', detail: 'un agent' }],
}
const ROOT = 'C:\\Users\\jeanp\\New folder'
const S = { type: 'object', properties: { fichiers: { type: 'array', items: { type: 'string' } }, corrections: { type: 'array', items: { type: 'string' } }, aTrancherParJP: { type: 'array', items: { type: 'string' } } }, required: ['fichiers', 'corrections', 'aTrancherParJP'] }
phase('Texte')
return await agent(`Tu travailles sur « Le Grand Livre du Chalet » (manuel de survie imprimé). Projet : ${ROOT}. **CLAUDE.md prime** (règle 1 : aucun chiffre ni fait sans source ; aucune attribution dans le texte ; les noms d'usage québécois).

**Ta mission : aligner le texte du ch. 62 (\`chapitres/62-carte-de-la-carcasse.md\`) sur la documentation à la source faite pour ses planches** : \`suivi/62-documentation-planches.md\`, surtout sa section 3 (écarts de noms et de faits) et les sources \`sources/62-carcasse-*\`. Les 17 planches 62-02 à 62-19 sont dessinées d'après cette documentation : le texte doit dire la même chose qu'elles.

À corriger, avec Edit, sans réécrire le chapitre :
- le **merlan** : le chapitre en fait le gracilis ; l'ACIA, l'OQLF, la CEE-ONU et l'IMPS en font le chapeau de l'intérieur de ronde (la planche 62-08 suit ces sources) ;
- le **« nerf central » de la noix de ronde** : aucune source, à retirer ;
- la **nappe nerveuse de l'extérieur de ronde** : sur le bord ventral et à l'aponévrose, pas « sur toute la face externe » ;
- le **gras « entre les couches » de la poitrine** : sur la face interne selon les sources ;
- **« haut de croupe »** (haut de surlonge à l'ACIA) : garde le nom québécois d'usage s'il est courant, et donne l'autre entre parenthèses une fois ;
- **palette dessus / dessous** : le supra-épineux est devant l'épine, l'infra-épineux derrière ; vérifie aussi le **ch. 64** (quartier avant) et aligne les deux ;
- le **jarret avant** qui figure dans deux régions du tableau 5.1 : une seule ;
- le **grain** : biceps fémoral bipenné et longe à fibres obliques, contre « grain régulier / droit » dans le chapitre ; dis ce que la source établit, sans angle inventé ;
- le **ligament rond de la hanche** (§9, étape 5) : petit ou absent chez le bœuf selon Sisson ; dis-le prudemment ou retire l'affirmation si elle n'a pas de source pour l'orignal.
Pour chaque correction, vérifie qu'aucune autre phrase ne s'appuyait sur l'ancienne version, et que les renvois de planches restent justes. Note chaque changement à la fin de \`suivi/62-redaction.md\` (et \`suivi/64-redaction.md\`), section « Alignement sur la documentation des planches — 29 septembre 2026 », avec le fichier de source. Ce qui demande un choix de JP (un nom d'usage contre un nom officiel, par exemple) va dans « aTrancherParJP ». Ne touche à aucune planche.`, { label: 'texte du ch. 62 aligné sur les planches', phase: 'Texte', schema: S })
