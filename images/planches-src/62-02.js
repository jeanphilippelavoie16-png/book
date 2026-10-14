// Planche 62-02 — la carte de la carcasse : cinq régions et leurs os repères.
// Chapitre 62, § 5.1 (tableau 5.1, dans l'ordre de démontage). Documentation :
// suivi/62-documentation-planches.md, section 6 (limites des régions à la source) et section 5
// (la carcasse commune, images/planches-src/_carcasse-orignal.js). Aucune cote : on ne construit
// rien, et aucune dimension d'orignal n'est établie. La tête est retirée (JP, 29 septembre) : le
// cou finit net à l'atlas, comme sur une carcasse.
//
// Vue A : les cinq régions, chacune sa trame, numérotées 1 à 5 dans l'ordre du tableau 5.1.
// Vue B : le squelette dans la même silhouette, à la même échelle ; seuls les os qui bornent les
// régions (et ceux qui les portent) sont dessinés, les six repères en trait appuyé, les limites
// des régions en tireté fin.
const C = require('./_carcasse-orignal');

module.exports = (h) => {
  const place = z => C.placer(z, { echelle: C.ECHELLE_CARTE });
  return {
    ref: '62-02',
    titre: 'La carte de la carcasse : cinq régions et leurs os repères',
    desc: "Carcasse d'orignal écorchée, sans la tête, debout, de profil gauche. "
      + "En haut, les cinq régions du tableau 5.1, chacune d'une trame : 1 jarrets et bas de pattes, sous le grasset "
      + "et sous le coude ; 2 quartier arrière, du devant du bassin au grasset ; 3 dos, de la jonction de la dernière "
      + "cervicale et de la première dorsale au bassin, jusqu'aux cartilages des côtes et à la dernière côte ; "
      + "4 quartier avant, l'épaule jusqu'au coude et la poitrine jusqu'à la huitième côte ; 5 cou et flanc. "
      + "En bas, la même carcasse à la même échelle, le squelette dedans, et les six os qui bornent les régions.",
    format: 'pleine',
    disposition: [['regions'], ['os']],
    vues: {
      regions: {
        // la charte : les pattes du côté loin en gris loin (option du module)
        dessin: z => C.dessiner(h, place(z), { id: 'a', regions: true, limites: 'plein', loin: 'gris' }),
        renvois: z => {
          const p = place(z);
          return [
            { n: 1, texte: 'jarrets et bas de pattes', rond: p.pt([1640, 1200]), cible: p.pt('canonArriere') },
            { n: 2, texte: 'quartier arrière : cuisse et croupe', rond: p.pt([1640, 420]), cible: p.pt('cuisse') },
            { n: 3, texte: 'dos : longe, filet, côtes', rond: [p.pt([900, 0])[0], 13], cible: p.pt([900, 320]) },
            { n: 4, texte: 'quartier avant : palette et poitrine', rond: p.pt([250, 700]), cible: p.pt([650, 560]) },
            { n: 5, texte: 'cou et flanc', rond: p.pt([1110, 960]), cible: p.pt('flanc') },
          ];
        },
      },
      os: {
        dessin: z => C.dessiner(h, place(z), {
          id: 'b', limites: 'tirete', loin: 'gris',
          os: ['vertebres', 'sacrum', 'cotes', 'sternum', 'omoplate', 'cartilageOmoplate', 'humerus', 'radius', 'cubitus',
            'bassin', 'femur', 'rotule', 'tibia'],
          osForts: ['rotule', 'cubitus', 'bassin', 'cartilageOmoplate', 'C7', 'T1', 'cote13'],
        }),
        renvois: z => {
          const p = place(z);
          return [
            { n: 6, texte: 'grasset et rotule', rond: p.pt([1180, 1000]), cible: p.pt('rotule') },
            { n: 7, texte: 'coude, pointe de l’olécrane', rond: p.pt([880, 1000]), cible: p.pt('olecrane') },
            { n: 8, texte: 'pointe de la hanche, devant du bassin', rond: [p.pt([1201, 0])[0], 13], cible: p.pt('pointeHanche') },
            { n: 9, texte: 'dernière cervicale, première dorsale', rond: p.pt([280, 320]), cible: p.pt('c7t1') },
            { n: 10, texte: 'bord du cartilage de l’omoplate', rond: p.pt([280, 170]), cible: p.pt('cartilageOmoplate') },
            { n: 11, texte: 'dernière côte', rond: p.pt([1030, 1000]), cible: p.pt('derniereCote') },
          ];
        },
      },
    },
  };
};
