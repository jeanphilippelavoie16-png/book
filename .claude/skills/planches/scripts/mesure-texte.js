// Mesure de texte pour Georgia, étalonnée dans un vrai navigateur
// (getComputedTextLength sur des chaînes répétées, corps 100, le 2026-09-23).
//
// Le SVG ne connaît pas la largeur de son texte. Sans cette table, un agent devine,
// et une boîte devinée est décentrée ou déborde. Les valeurs sont des fractions du
// corps de texte : une minuscule de Georgia fait 0,517 em.

const LARGEUR = {
  espace: 0.241,
  etroit: 0.311,     // i l j t f r . , ; : ! ' |
  minuscule: 0.517,
  chiffre: 0.548,
  majuscule: 0.659,
  large: 0.876,      // m w M W —
};

const ETROIT = new Set("iljtfr.,;:!'|’()[]".split(''));
const LARGE = new Set('mwMW—'.split(''));

function largeurCaractere(c) {
  if (c === ' ' || c === ' ' || c === ' ') return LARGEUR.espace;
  if (ETROIT.has(c)) return LARGEUR.etroit;
  if (LARGE.has(c)) return LARGEUR.large;
  if (/[0-9]/.test(c)) return LARGEUR.chiffre;
  if (/[A-ZÀ-Þ]/.test(c)) return LARGEUR.majuscule;
  return LARGEUR.minuscule;
}

/** Largeur rendue d'une chaîne, en unités SVG, pour un corps donné. */
function largeur(texte, corps) {
  let e = 0;
  for (const c of texte) e += largeurCaractere(c);
  return e * corps;
}

/**
 * Coupe un paragraphe en lignes qui tiennent dans `max` unités.
 * Coupe aux espaces seulement ; un mot seul trop long reste entier (et sera signalé).
 */
function couper(texte, corps, max) {
  // Un mot d'une ou deux lettres ne reste pas seul en bout de ligne : on l'accroche au
  // mot suivant par une espace insécable (« On », « à », « le », « ne »…). Même chose
  // pour le tiret cadratin, qui ne commence pas une ligne.
  const colle = texte
    .replace(/(^|\s)(\S{1,2})\s+/g, '$1$2 ')
    .replace(/\s+—/g, ' —');
  const mots = colle.split(/[ \t\n]+/).filter(Boolean);
  const lignes = [];
  let cur = '';
  for (const m of mots) {
    const essai = cur ? cur + ' ' + m : m;
    if (largeur(essai, corps) <= max || !cur) cur = essai;
    else { lignes.push(cur); cur = m; }
  }
  if (cur) lignes.push(cur);
  return lignes.map(l => l.replace(/ /g, ' '));
}

module.exports = { LARGEUR, largeur, couper };
